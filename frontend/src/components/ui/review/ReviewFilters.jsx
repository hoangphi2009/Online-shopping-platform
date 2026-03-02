import styles from "./reviewFilters.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const ReviewFilters = ({ selectedFilter, onFilterChange, ratingStats }) => {
  const { t } = useTranslation();

  const filterOptions = [
    { key: "all", label: t("components.ui.product.reviews.filter.all") },
    {
      key: "images",
      label: t("components.ui.product.reviews.filter.with_images"),
    },
    { key: "5", label: `5 ${t("components.ui.product.reviews.filter.stars")}` },
    { key: "4", label: `4 ${t("components.ui.product.reviews.filter.stars")}` },
    { key: "3", label: `3 ${t("components.ui.product.reviews.filter.stars")}` },
    { key: "2", label: `2 ${t("components.ui.product.reviews.filter.stars")}` },
    { key: "1", label: `1 ${t("components.ui.product.reviews.filter.star")}` },
  ];

  return (
    <div className={cx("rating-filters")}>
      {filterOptions.map((option) => (
        <button
          key={option.key}
          className={cx("filter-btn", {
            active: selectedFilter === option.key,
            "has-count": option.key !== "all" && option.key !== "images",
          })}
          onClick={() => onFilterChange(option.key)}
        >
          {option.label}
          {option.key !== "all" && option.key !== "images" && (
            <span className={cx("count")}>
              ({ratingStats[option.key] || 0})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ReviewFilters;
