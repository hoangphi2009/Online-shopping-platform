import styles from "./productPrice.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ProductPrice = ({ price, offerPrice }) => {
  return (
    <div className={cx("price-section")}>
      {offerPrice ? (
        <>
          <span className={cx("current-price")}>
            {offerPrice.toLocaleString()}₫
          </span>
          <span className={cx("old-price")}>{price.toLocaleString()}₫</span>
        </>
      ) : (
        <span className={cx("current-price")}>{price?.toLocaleString()}₫</span>
      )}
    </div>
  );
};

export default ProductPrice;
