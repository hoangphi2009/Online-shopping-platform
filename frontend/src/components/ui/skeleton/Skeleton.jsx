import styles from "./skeleton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Skeleton = ({ variant = "card", width = "100%", height = "20px" }) => {
  return <div className={cx("skeleton", variant)} style={{ width, height }} />;
};

export default Skeleton;
