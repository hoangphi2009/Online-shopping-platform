import CartHeader from "../../ui/cart/CartHeader";
import CartFooter from "../../ui/cart/CartFooter";
import CartList from "../../ui/cart/CartList";
import styles from "./mainCartLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MainCartLayout = () => {
  return (
    <div>
      <header className={cx("cart-header")}>
        <CartHeader />
      </header>
      <main className={cx("main-cart-content")}>
        <CartList />
      </main>
      <footer className={cx("cart-footer")}>
        <CartFooter />
      </footer>
    </div>
  );
};

export default MainCartLayout;
