import Product from "../../models/product.model.js";

const getAllProductsService = async () => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("brandId", "brandName")
      .sort({ createdAt: -1 });
    return products;
  } catch (error) {
    return error.message;
  }
};

export default getAllProductsService;
