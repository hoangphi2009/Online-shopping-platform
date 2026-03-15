import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthIntro from "../shared/AuthIntro";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../../../redux/authSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "./../../../constants/constants";

const cx = classNames.bind(styles);

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = (role) => {
    if (role === 2) return "/admin/dashboard";
    if (role === 1) return "/seller/dashboard";
    return "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL_ENDPOINT}/login`, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        dispatch(setAccessToken(response.data.accessToken));
        const role = response.data.user.role;
        navigate(path(role));
        toast.success(t("components.auth.login.success_message"));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          t("components.auth.login.error_message")
      );
    }
  };

  return (
    <div className={cx("login-wrapper")}>
      <div className={cx("login-container")}>
        <div className={cx("login-card")}>
          <h1 className={cx("title")}>{t("components.auth.login.title")}</h1>
          <p className={cx("subtitle")}>
            {t("components.auth.login.subtitle")}
          </p>

          <form className={cx("login-form")} onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> {t("components.auth.login.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("components.auth.login.email_placeholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> {t("components.auth.login.password")}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("components.auth.login.password_placeholder")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={cx("forgot-password")}>
              <Link to="/forgot-password">
                {t("components.auth.login.forgot_password")}
              </Link>
            </div>

            <button type="submit" className={cx("submit-btn")}>
              {t("components.auth.login.submit_btn")}
            </button>
          </form>

          <div className={cx("divider")}>
            <span>{t("components.auth.login.or")}</span>
          </div>

          <p className={cx("register-link")}>
            {t("components.auth.login.register_text")}{" "}
            <Link to="/register">
              {t("components.auth.login.register_link")}
            </Link>
          </p>
        </div>
      </div>
      <AuthIntro type="login" />
    </div>
  );
};

export default Login;
