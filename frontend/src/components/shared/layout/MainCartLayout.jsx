import { useSelector } from "react-redux";
import CartHeader from "../../ui/cart/CartHeader";
import CartFooter from "../../ui/cart/CartFooter";
import CartList from "../../ui/cart/CartList";
import styles from "./mainCartLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MainCartLayout = () => {
  const hasProducts = useSelector((state) => state.cart.products.length > 0);

  return (
    <div>
      {hasProducts && (
        <header className={cx("cart-header")}>
          <CartHeader />
        </header>
      )}
      <main className={cx("main-cart-content")}>
        <CartList />
      </main>
      {hasProducts && (
        <footer className={cx("cart-footer")}>
          <CartFooter />
        </footer>
      )}
    </div>
  );
};

export default MainCartLayout;
