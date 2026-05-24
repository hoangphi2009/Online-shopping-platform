import getProductsService from "../../services/sharedServices/getProducts.service.js";
import { AppError } from "../../utils/error.js";

const getProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const { categoryId, sort } = req.query;
    const result = await getProductsService(page, limit, { categoryId, sort });
    return res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      success: true,
      ...result,
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
    });
  }
};

export default getProductsController;
