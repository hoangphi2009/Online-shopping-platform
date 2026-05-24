import { useQuery } from "@tanstack/react-query";
import { fetchShopProducts } from "../api.js";

const useShopProducts = ({ page, categoryId, sort }) => {
  return useQuery({
    queryKey: ["shopProducts", page, categoryId, sort],
    queryFn: () => fetchShopProducts({ page, limit: 12, categoryId, sort }),
    keepPreviousData: true,
  });
};

export default useShopProducts;