import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import DropDownLang from "../../../utils/DropDownLang.jsx";
import DropDownProfile from "../../../utils/DropDownProfile.jsx";
import { useSelector } from "react-redux";
import LoginButton from "../../../utils/LoginButton";

const cx = classNames.bind(styles);

const Navbar = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);
  const rawCartCount = cartProducts?.length;
  const cartCount = rawCartCount > 99 ? "99+" : rawCartCount;
  const links = [
    { label: t("components.shared.navbar.dashboard"), path: "/" },
    { label: t("components.shared.navbar.shop"), path: "/shop" },
    { label: t("components.shared.navbar.about"), path: "/about" },
  ];

  const navigate = useNavigate();
  return (
    <div className={cx("navbar")}>
      <div className={cx("navbar-left")}>Logo</div>
      <div className={cx("navbar-center")}>
        {links.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
        <input
          type="text"
          placeholder={t("components.shared.navbar.search_placeholder")}
        />
      </div>
      <div className={cx("navbar-right")}>
        <DropDownLang />
        <button className={cx("cart")} onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span className={cx("cartBadge")}>{cartCount}</span>
        </button>
        {user ? <DropDownProfile /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Navbar;
