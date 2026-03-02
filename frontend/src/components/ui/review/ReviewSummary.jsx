import styles from "./reviewSummary.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import RatingStars from "./RatingStars";
import ReviewFilters from "./ReviewFilters";

const cx = classNames.bind(styles);

const ReviewSummary = ({
  averageRating,
  ratingStats,
  reviewsWithImages,
  reviewsWithComments,
  selectedFilter,
  onFilterChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className={cx("rating-summary")}>
      <div className={cx("overall-rating")}>
        <span className={cx("rating-number")}>{averageRating}</span>
        <span className={cx("rating-text")}>{t("components.ui.product.reviews.out_of")} 5</span>
        <RatingStars rating={Math.round(averageRating)} size="medium" />
      </div>

      <ReviewFilters
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
        ratingStats={ratingStats}
      />

      <div className={cx("additional-info")}>
        <span className={cx("info-item")}>
          {t("components.ui.product.reviews.with_comments")} ({reviewsWithComments})
        </span>
        <span className={cx("info-item")}>
          {t("components.ui.product.reviews.with_images")} ({reviewsWithImages})
        </span>
      </div>
    </div>
  );
};

export default ReviewSummary;
