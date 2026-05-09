import createCategoryService from "../../services/adminServices/createCategory.service.js";
import { AppError } from "../../utils/error.js";

const createCategoryController = async (req, res) => {
  try {
    const categoryData = req.body;
    const category = await createCategoryService(categoryData);

    return res.status(201).json({
      message: "Tạo danh mục thành công",
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

export default createCategoryController;
