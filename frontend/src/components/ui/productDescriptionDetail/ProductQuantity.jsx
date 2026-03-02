import styles from "./productQuantity.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import QuantityControl from "../quantityControl/QuantityControl";

const cx = classNames.bind(styles);

const ProductQuantity = ({ stock, onQuantityChange }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantity);
    }
  }, [quantity, onQuantityChange]);

  return (
    <div className={cx("quantity-section")}>
      <span className={cx("label")}>
        {t("components.ui.product.quantity.label")}
      </span>
      <QuantityControl
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={stock}
      />
      <span className={cx("stock-status")}>
        {stock > 0
          ? t("components.ui.product.quantity.in_stock")
          : t("components.ui.product.quantity.out_of_stock")}
      </span>
    </div>
  );
};

export default ProductQuantity;
