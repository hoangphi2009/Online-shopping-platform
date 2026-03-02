import styles from "./productStats.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const ProductStats = ({ rating, reviews, sold }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("stats-section")}>
      <span className={cx("rating")}>{rating?.toFixed(1)} ★</span>
      <span className={cx("divider")}>|</span>
      <span className={cx("reviews")}>
        {reviews} {t("components.ui.product.stats.reviews")}
      </span>
      <span className={cx("divider")}>|</span>
      <span className={cx("sold")}>
        {t("components.ui.product.stats.sold")} {sold}
      </span>
    </div>
  );
};

export default ProductStats;
