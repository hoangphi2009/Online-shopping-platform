import styles from "./productSkeleton.module.scss";
import classNames from "classnames/bind";
import Skeleton from "./Skeleton";

const cx = classNames.bind(styles);

const ProductSkeleton = () => {
  return (
    <div className={cx("product-skeleton")}>
      <div className={cx("badge")} />
      <div className={cx("image")}>
        <Skeleton variant="card" width="100%" height="200px" />
      </div>
      <div className={cx("content")}>
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="80%" height="14px" />
        <Skeleton variant="text" width="60%" height="20px" />
        <Skeleton variant="text" width="100%" height="36px" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
