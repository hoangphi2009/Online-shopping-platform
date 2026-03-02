import mongoose from "mongoose";

const userIdentitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    provider: {
      type: String,
      enum: ["local", "google", "facebook", "apple"],
      required: true,
      lowercase: true
    },
    providerUid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

userIdentitySchema.index(
  { provider: 1, providerUid: 1 },
  { unique: true }
);

userIdentitySchema.index({ userId: 1 });

const UserIdentity = mongoose.model("user_identity", userIdentitySchema);

export default UserIdentity;
