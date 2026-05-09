import updateCategoryService from "../../services/adminServices/updateCategory.service.js";
import { AppError } from "../../utils/error.js";

const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updateData = req.body;

    const category = await updateCategoryService(categoryId, updateData);

    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      success: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
      error: error.message,
    });
  }
};

export default updateCategoryController;
