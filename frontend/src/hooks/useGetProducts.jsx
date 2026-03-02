import { BACKEND_URL_ENDPOINT } from "../constants/constants.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await axios.get(`${BACKEND_URL_ENDPOINT}/products`, {
    params: { page, limit: 4 },
  });
  return res.data;
};

const useGetProducts = (page) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
};

export { useGetProducts };
