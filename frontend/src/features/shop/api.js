import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../../constants/constants.js";

export const fetchShopProducts = async ({ page = 1, limit = 12, categoryId, sort }) => {
  const params = { page, limit };
  if (categoryId) params.categoryId = categoryId;
  if (sort) params.sort = sort;
  const res = await axios.get(`${BACKEND_URL_ENDPOINT}/products`, { params });
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BACKEND_URL_ENDPOINT}/categories`);
  return res.data;
};