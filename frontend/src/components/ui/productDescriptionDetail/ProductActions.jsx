import styles from "./productActions.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";

const cx = classNames.bind(styles);

const ProductActions = ({ onAddToCart, onBuyNow, isOutOfStock }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("action-buttons")}>
      <Button
        className={cx("add-to-cart-button")}
        onClick={onAddToCart}
        disabled={isOutOfStock}
      >
        {t("components.ui.product.actions.add_to_cart")}
      </Button>
      <Button
        className={cx("buy-now-button")}
        onClick={onBuyNow}
        disabled={isOutOfStock}
      >
        {t("components.ui.product.actions.buy_now")}
      </Button>
    </div>
  );
};

export default ProductActions;
