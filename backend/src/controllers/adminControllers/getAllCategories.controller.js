import getAllCategoriesService from "../../services/adminServices/getAllCategories.service.js";

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();

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

export default getAllCategoriesController;
