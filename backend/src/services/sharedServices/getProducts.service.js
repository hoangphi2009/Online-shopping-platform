import Product from "../../models/product.model.js";
import { AppError } from "../../utils/error.js";

const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating: { averageRating: -1 },
  bestseller: { sold: -1 },
};

const getProductsService = async (page = 1, limit = 12, { categoryId, sort } = {}) => {
  page = Math.max(page, 1);
  limit = Math.min(limit, 50);
  const skip = (page - 1) * limit;

  const filter = {};
  if (categoryId) filter.category = Number(categoryId);

  const sortQuery = SORT_OPTIONS[sort] || SORT_OPTIONS.newest;

  const total = await Product.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && totalPages !== 0) {
    return {
      products: [],
      page,
      limit,
      total,
      totalPages,
      nextPage: false,
      prevPage: page > 1,
    };
  }

  const products = await Product.find(filter)
    .populate("category", "name")
    .populate("brandId", "brandName")
    .sort(sortQuery)
    .skip(skip)
    .limit(limit);

  return {
    products,
    page,
    limit,
    total,
    totalPages,
    nextPage: page < totalPages,
    prevPage: page > 1,
  };
};

export default getProductsService;
