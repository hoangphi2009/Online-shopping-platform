import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { setLogout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { toast } from "sonner";
import { BACKEND_URL_ENDPOINT } from '../constants/constants';
import classNames from "classnames/bind";
import styles from "./dropDownProfile.module.scss";
const cx = classNames.bind(styles);

const DropDownProfile = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL_ENDPOINT}/logout`, null, { withCredentials: true });
      if (res.data.success) {
        dispatch(setLogout());
        toast.success(t("components.shared.profile.logout_success"));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.res?.data?.message || t("components.shared.profile.logout_failed"));
    } finally {
      dispatch(setLogout());
      dispatch(clearCart());
      navigate("/");
    }
  };

  const fullName = () => {
    if (i18n.language === "en") {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return `${user.lastName} ${user.firstName}`;
    }
  }

  const menuItems = [
    { 
      id: "account", 
      label: t("components.shared.profile.my_account"), 
      icon: faUser,
      onClick: () => navigate("/account")
    },
    { 
      id: "orders", 
      label: t("components.shared.profile.my_orders"), 
      icon: faShoppingBag,
      onClick: () => navigate("/orders")
    },
    { 
      id: "logout", 
      label: t("components.shared.profile.logout"), 
      icon: faRightFromBracket,
      onClick: handleLogout
    },
  ];


  const handleMenuClick = async (item) => {
    await item.onClick();
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx("profile-dropdown")}>
      <button 
        className={cx("avatar-button")} 
        onClick={toggleDropdown}
        aria-label="Profile menu"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className={cx("avatar-img")} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </button>

      {isOpen && (
        <>
          <div className={cx("overlay")} onClick={() => setIsOpen(false)} />
          <div className={cx("profile-menu")}>
          <div className={cx("profile-header")}>
            <div className={cx("avatar-large")}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <div className={cx("user-info")}>
              <div className={cx("username")}>{fullName()}</div>
              <div className={cx("email")}>{user.email}</div>
            </div>
          </div>

          <div className={cx("menu-list")}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={cx("menu-item", { logout: item.id === "logout" })}
                onClick={() => handleMenuClick(item)}
              >
                <FontAwesomeIcon icon={item.icon} className={cx("menu-icon")} />
                <span className={cx("menu-label")}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default DropDownProfile;
