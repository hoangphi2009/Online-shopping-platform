import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./productsSection.module.scss";
import classNames from "classnames/bind";
import Products from "./Products";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetProducts } from "../../../hooks/useGetProducts";

const cx = classNames.bind(styles);

const ProductsSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data } = useGetProducts(page);
  const totalPages = data?.totalPages;

  return (
    <div className={cx("products-section")}>
      <div className={cx("products-header")}>
        <div className={cx("products-title")}>
          <h2>{t("components.home.products.title")}</h2>
          <p className={cx("products-title-description")}>
            {t("components.home.products.description")}
          </p>
        </div>
      </div>
      <div className={cx("products-content")}>
        <Products page={page} />
        <Stack alignItems="center" className={cx("pagination-container")}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductsSection;
