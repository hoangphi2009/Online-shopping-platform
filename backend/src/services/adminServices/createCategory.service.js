import Category from "../../models/category.model.js";
import Counter from "../../models/counter.model.js";
import { AppError } from "../../utils/error.js";

const createCategoryService = async (categoryData) => {
  const { name } = categoryData;

  if (!name || !name.trim()) {
    throw new AppError("Tên danh mục không được để trống", 400);
  }

  const existingCategory = await Category.findOne({
    name: name.trim(),
  });

  if (existingCategory) {
    throw new AppError("Danh mục này đã tồn tại", 400);
  }

  let counter = await Counter.findOne({ name: "category" });
  if (!counter) {
    counter = new Counter({ name: "category", value: 0 });
  }
  counter.value += 1;
  await counter.save();

  const newCategory = new Category({
    _id: counter.value,
    name: name.trim(),
    isActive: true,
  });

  await newCategory.save();
  return newCategory;
};

export default createCategoryService;
