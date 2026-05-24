import Category from "../../models/category.model.js";

const getAllCategoriesService = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return categories;
};

export default getAllCategoriesService;
