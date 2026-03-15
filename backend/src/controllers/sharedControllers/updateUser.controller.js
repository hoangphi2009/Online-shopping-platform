import updateUserService from "../../services/sharedServices/updateUser.service.js";

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updateFile = req.file;

    if (updateData?.role !== undefined && updateData.role !== "") {
      const roleNum = Number(updateData.role);
      if (!Number.isInteger(roleNum) || ![0, 1, 2].includes(roleNum)) {
        return res.status(400).json({
          message: "Role không hợp lệ (0: user, 1: seller, 2: admin)",
          success: false,
        });
      }
      updateData.role = roleNum;
    }

    const result = await updateUserService(userId, updateData, updateFile);

    if (typeof result === "string") {
      return res.status(400).json({
        message: result,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Cập nhật user thành công",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
      error: error.message,
    });
  }
};

export default updateUserController;
