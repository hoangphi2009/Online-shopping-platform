import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./shopPage.module.scss";
import ShopSidebar from "../features/shop/components/ShopSidebar.jsx";
import ShopProductGrid from "../features/shop/components/ShopProductGrid.jsx";
const cx = classNames.bind(styles);

const ShopPage = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("newest");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setPage(1);
  };

  return (
    <div className={cx("shop-page")}>
      <div className={cx("shop-container")}>
        <ShopSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
        />
        <ShopProductGrid
          page={page}
          onPageChange={setPage}
          categoryId={selectedCategory}
          sort={selectedSort}
        />
      </div>
    </div>
  );
};

export default ShopPage;