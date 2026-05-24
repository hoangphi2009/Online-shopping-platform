import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api.js";

const useShopCategories = () => {
  return useQuery({
    queryKey: ["shopCategories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });
};

export default useShopCategories;