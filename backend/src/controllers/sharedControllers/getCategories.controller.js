import Category from "../../models/category.model.js";

const getCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Lấy danh sách danh mục thành công",
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
      error: error.message,
    });
  }
};

export default getCategoriesController;
