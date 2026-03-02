import IntroSection from "./introSection/IntroSection";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import ProductsSection from "./productSection/ProductsSection";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx("home-page")}>
      <div className={cx("intro-section")}>
        <IntroSection />
      </div>
      <div className={cx("products-section")}>
        <ProductsSection />
      </div>
    </div>
  );
};

export default HomePage;
