import React from "react";
import classNames from "classnames/bind";
import styles from "./shopProductGrid.module.scss";
import Product from "../../../components/home/productSection/Product.jsx";
import ProductSkeleton from "../../../components/ui/skeleton/ProductSkeleton.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useShopProducts from "../hooks/useShopProducts.jsx";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const ShopProductGrid = ({ page, onPageChange, categoryId, sort }) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useShopProducts({ page, categoryId, sort });
  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className={cx("grid-wrapper")}>
      <div className={cx("grid-header")}>
        <span className={cx("result-count")}>
          {isLoading
            ? t("components.shop.grid.loading")
            : t("components.shop.grid.result_count", { count: total })}
        </span>
      </div>

      <div className={cx("grid", { fetching: isFetching && !isLoading })}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.length > 0
          ? products.map((product, index) => (
              <Product
                key={product._id}
                product={product}
                index={(page - 1) * 12 + index + 1}
              />
            ))
          : (
            <div className={cx("empty")}>
              <p>{t("components.shop.grid.empty")}</p>
            </div>
          )}
      </div>

      {totalPages > 1 && (
        <Stack alignItems="center" className={cx("pagination")}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            disabled={isFetching}
          />
        </Stack>
      )}
    </div>
  );
};

export default ShopProductGrid;