import Category from "../../models/category.model.js";
import Product from "../../models/product.model.js";
import { AppError } from "../../utils/error.js";

const deleteCategoryService = async (categoryId) => {
  if (!categoryId) {
    throw new AppError("ID danh mục không được để trống", 400);
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError("Danh mục không tồn tại", 404);
  }

  const productsWithCategory = await Product.countDocuments({
    category: categoryId,
  });

  if (productsWithCategory > 0) {
    throw new AppError(
      `Không thể xóa danh mục này vì có ${productsWithCategory} sản phẩm đang sử dụng`,
      400
    );
  }

  await Category.findByIdAndDelete(categoryId);
  return { message: "Xóa danh mục thành công" };
};

export default deleteCategoryService;
