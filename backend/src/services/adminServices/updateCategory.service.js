import Category from "../../models/category.model.js";
import { AppError } from "../../utils/error.js";

const updateCategoryService = async (categoryId, updateData) => {
  if (!categoryId) {
    throw new AppError("ID danh mục không được để trống", 400);
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError("Danh mục không tồn tại", 404);
  }

  if (updateData.name && updateData.name.trim()) {
    const existingCategory = await Category.findOne({
      _id: { $ne: categoryId },
      name: updateData.name.trim(),
    });
    if (existingCategory) {
      throw new AppError("Tên danh mục này đã tồn tại", 400);
    }
    category.name = updateData.name.trim();
  }

  if (updateData.isActive !== undefined) {
    category.isActive = updateData.isActive;
  }

  await category.save();
  return category;
};

export default updateCategoryService;
