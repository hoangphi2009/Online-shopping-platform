import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./cartEmpty.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CartEmpty = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={cx("emptyCart")}>
      <img
        src="/sadness-cart.svg"
        alt={t("components.shared.emptyCart.title")}
        className={cx("emptyCartImage")}
      />
      <h2 className={cx("emptyCartTitle")}>
        {t("components.shared.emptyCart.title")}
      </h2>
      <p className={cx("emptyCartMessage")}>
        {t("components.shared.emptyCart.message")}
      </p>
      <Link to={user ? "/shop" : "/login"} className={cx("shoppingButton")}>
        {t(`components.shared.emptyCart.${user ? "shopping_button" : "login_message"}`)}
      </Link>
    </div>
  );
};

export default CartEmpty;
