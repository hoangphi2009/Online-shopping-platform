import React from "react";
import Product from "./Product";
import ProductSkeleton from "../../../components/ui/skeleton/ProductSkeleton";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import { useGetProducts } from "../../../hooks/useGetProducts";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Products = ({ page = 1 }) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useGetProducts(page);

  if (isLoading) {
    return (
      <div className={cx("products-container")}>
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  const products = data?.products;
  return (
    <div className={cx("products-container")}>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <Product key={product._id} product={product} index={index + 1} />
        ))
      ) : (
        <div className={cx("no-products")}>
          {t("components.home.products.no_products")}
        </div>
      )}
      {isFetching && !isLoading && (
        <div className={cx("loading-spinner")}>
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
};

export default Products;
