import { Link } from "react-router-dom";
import styles from "./footerBottom.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const FooterBottom = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className={cx("footer-bottom")}>
      <div className={cx("footer-bottom-content")}>
        <p className={cx("copyright")}>
          {t("components.ui.footer.footer_bottom.copyright", {
            year: currentYear,
          })}
        </p>
        <div className={cx("footer-bottom-links")}>
          <Link to="/privacy-policy">
            {t("components.ui.footer.footer_bottom.privacy_policy")}
          </Link>
          <span className={cx("separator")}>•</span>
          <Link to="/terms-of-service">
            {t("components.ui.footer.footer_bottom.terms_of_service")}
          </Link>
          <span className={cx("separator")}>•</span>
          <Link to="/cookies">
            {t("components.ui.footer.footer_bottom.cookie_policy")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
