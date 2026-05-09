import deleteCategoryService from "../../services/adminServices/deleteCategory.service.js";
import { AppError } from "../../utils/error.js";

const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await deleteCategoryService(categoryId);

    return res.status(200).json({
      message: result.message,
      success: true,
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

export default deleteCategoryController;
