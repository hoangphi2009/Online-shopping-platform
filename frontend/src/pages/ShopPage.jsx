import React from "react";
import classNames from "classnames/bind";
import styles from "./shopPage.module.scss";
import ShopSidebar from "../features/shop/components/ShopSidebar.jsx";
import ShopProductGrid from "../features/shop/components/ShopProductGrid.jsx";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const categoryId = searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : null;
  const sort = searchParams.get("sort") || "newest";

  const updateParams = (updates) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      return next;
    });
  };

  const handleCategoryChange = (id) => {
    updateParams({ categoryId: id, page: 1 });
  };

  const handleSortChange = (value) => {
    updateParams({ sort: value, page: 1 });
  };

  const handlePageChange = (value) => {
    updateParams({ page: value });
  };

  return (
    <div className={cx("shop-page")}>
      <div className={cx("shop-container")}>
        <ShopSidebar
          selectedCategory={categoryId}
          onCategoryChange={handleCategoryChange}
          selectedSort={sort}
          onSortChange={handleSortChange}
        />
        <ShopProductGrid
          page={page}
          onPageChange={handlePageChange}
          categoryId={categoryId}
          sort={sort}
        />
      </div>
    </div>
  );
};

export default ShopPage;