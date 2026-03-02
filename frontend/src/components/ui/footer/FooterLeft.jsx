import { Link } from "react-router-dom";
import styles from "./footerLeft.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

const FooterLeft = () => {
  const { t } = useTranslation();
  const socials = [
    {
      label: "Instagram",
      icon: <FontAwesomeIcon icon={faInstagram} />,
      url: "https://instagram.com",
    },
    {
      label: "Facebook",
      icon: <FontAwesomeIcon icon={faFacebook} />,
      url: "https://facebook.com",
    },
    { label: "X", icon: <FontAwesomeIcon icon={faXTwitter} />, url: "https://x.com" },
    {
      label: "LinkedIn",
      icon: <FontAwesomeIcon icon={faLinkedin} />,
      url: "https://linkedin.com",
    },
  ];
  return (
    <div className={cx("footer-left")}>
      <h2>Logo</h2>
      <p>
        {t("components.ui.footer.footer_left.description")}
      </p>
      <div className={cx("social")}>
        <span>{t("components.ui.footer.footer_left.follow_us")}</span>
        <div className={cx("social-icons")}>
          {socials.map((social, index) => (
            <Link key={index} to={social.url} aria-label={social.label}>
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLeft;
