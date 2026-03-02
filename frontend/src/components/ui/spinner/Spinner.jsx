import styles from "./spinner.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Spinner = ({ size = "medium" }) => {
  return <div className={cx("spinner", size)}></div>;
};

export default Spinner;
