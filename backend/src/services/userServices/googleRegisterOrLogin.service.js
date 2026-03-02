import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../../models/user.model.js";
import UserIdentity from "../../models/userIdentity.model.js";
import { AppError } from "../../utils/error.js";

const buildUserResponse = (user) => {
  const userObj = user.toObject();
  const {
    password,
    confirmPassword,
    walletId,
    voucherId,
    __v,
    ...userWithoutSensitive
  } = userObj;

  return {
    ...userWithoutSensitive,
    role:
      user.role === 2 ? "admin" : user.role === 1 ? "shop" : "user",
  };
};

const googleRegisterOrLoginService = async (googleData) => {
  const { sub, email, firstName, lastName, avatar } = googleData || {};

  if (!sub) {
    throw new AppError("Invalid Google data: missing sub", 400);
  }

  let identity = await UserIdentity.findOne({
    provider: "google",
    providerUid: sub,
  }).populate("userId");

  if (identity && identity.userId) {
    const user = identity.userId;
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    return buildUserResponse(user);
  }

  let user = null;
  if (email) {
    user = await User.findOne({ email });
  }

  if (!user) {
    const randomPassword = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    user = new User({
      firstName: firstName || "Unknown",
      lastName: lastName || "User",
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      avatar,
    });
    await user.save();

    await UserIdentity.create({
      userId: user._id,
      provider: "google",
      providerUid: sub,
      email,
    });

    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    return buildUserResponse(user);
  }

  throw new AppError(
    "Account exists. Please login with email/password to link Google.",
    409
  );
};

export default googleRegisterOrLoginService;

