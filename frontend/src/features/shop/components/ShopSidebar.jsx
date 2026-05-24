import React from "react";
import classNames from "classnames/bind";
import styles from "./shopSidebar.module.scss";
import useShopCategories from "../hooks/useShopCategories.jsx";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const SORT_KEYS = ["newest", "price_asc", "price_desc", "rating", "bestseller"];

const ShopSidebar = ({ selectedCategory, onCategoryChange, selectedSort, onSortChange }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useShopCategories();
  const categories = data?.data || [];

  return (
    <aside className={cx("sidebar")}>
      <div className={cx("section")}>
        <h3 className={cx("section-title")}>{t("components.shop.sidebar.categories_title")}</h3>
        <ul className={cx("category-list")}>
          <li
            className={cx("category-item", { active: !selectedCategory })}
            onClick={() => onCategoryChange(null)}
          >
            {t("components.shop.sidebar.all_products")}
          </li>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className={cx("category-item", "skeleton")} />
              ))
            : categories.map((cat) => (
                <li
                  key={cat._id}
                  className={cx("category-item", { active: selectedCategory === cat._id })}
                  onClick={() => onCategoryChange(cat._id)}
                >
                  {cat.name}
                </li>
              ))}
        </ul>
      </div>

      <div className={cx("section")}>
        <h3 className={cx("section-title")}>{t("components.shop.sidebar.sort_title")}</h3>
        <ul className={cx("sort-list")}>
          {SORT_KEYS.map((key) => (
            <li
              key={key}
              className={cx("sort-item", { active: selectedSort === key })}
              onClick={() => onSortChange(key)}
            >
              {t(`components.shop.sort.${key}`)}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar;