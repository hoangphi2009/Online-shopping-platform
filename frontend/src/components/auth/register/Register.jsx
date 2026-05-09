import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants.js";
import { validateEmail } from "../../../CustomValidates.js";
import axios from "axios";
import AuthIntro from "../shared/AuthIntro";
import styles from "./register.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email" && emailError) setEmailError(null);
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(formData.email, t));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateEmail(formData.email, t);
    if (err) {
      setEmailError(err);
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL_ENDPOINT}/register`, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(t("components.auth.register.success_message"));
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          t("components.auth.register.error_message")
      );
    }
  };

  return (
    <div className={cx("register-wrapper")}>
      <div className={cx("register-container")}>
        <div className={cx("register-card")}>
          <h1 className={cx("title")}>{t("components.auth.register.title")}</h1>
          <p className={cx("subtitle")}>
            {t("components.auth.register.subtitle")}
          </p>

          <form className={cx("register-form")} onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <label htmlFor="firstName">
                  <FontAwesomeIcon icon={faUser} /> {t("components.auth.register.first_name")}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={t(
                  "components.auth.register.first_name_placeholder"
                )}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="lastName">
                  <FontAwesomeIcon icon={faUser} /> {t("components.auth.register.last_name")}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={t(
                  "components.auth.register.last_name_placeholder"
                )}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> {t("components.auth.register.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("components.auth.register.email_placeholder")}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                className={emailError ? cx("inputError") : ""}
              />
              {emailError && <span className={cx("fieldErrorMsg")}>{emailError}</span>}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> {t("components.auth.register.password")}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("components.auth.register.password_placeholder")}
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="confirmPassword">
                  <FontAwesomeIcon icon={faLock} /> {t("components.auth.register.confirm_password")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t(
                  "components.auth.register.confirm_password_placeholder"
                )}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className={cx("submit-btn")}>
              {t("components.auth.register.submit_btn")}
            </button>
          </form>

          <div className={cx("divider")}>
            <span>{t("components.auth.register.or")}</span>
          </div>

          <p className={cx("login-link")}>
            {t("components.auth.register.login_text")}{" "}
            <Link to="/login">{t("components.auth.register.login_link")}</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - INTRO */}
      <AuthIntro type="register" />
    </div>
  );
};

export default Register;
