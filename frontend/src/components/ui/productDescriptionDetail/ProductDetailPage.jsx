import styles from "./productDetailPage.module.scss";
import classNames from "classnames/bind";
import ProductDescriptionDetail from "./ProductDescriptionDetail.jsx";

const cx = classNames.bind(styles);

const ProductDetailPage = () => {
  return (
    <div className={cx("productDescriptionDetail-detail-page")}>
      <div className={cx("main-content")}>
        <ProductDescriptionDetail />
      </div>
    </div>
  );
};

export default ProductDetailPage;
