import { Outlet, Link } from "react-router-dom";
import styles from "./authLayout.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const AuthLayout = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className={cx("auth-layout")}>
      <header className={cx("auth-header")}>
        <Link to="/" className={cx("logo")}>
          <h1>{t("components.auth.layout.logo")}</h1>
        </Link>
        <nav className={cx("nav")}>
          <Link to="/" className={cx("back-link")}>
            {t("components.auth.layout.back_to_home")}
          </Link>
        </nav>
      </header>

      <main className={cx("auth-body")}>
        <Outlet />
      </main>

      <footer className={cx("auth-footer")}>
        <p>{t("components.auth.layout.footer_text", { year: currentYear })}</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
