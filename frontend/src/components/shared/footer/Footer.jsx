import FooterLeft from "../../ui/footer/FooterLeft";
import FooterLinks from "../../ui/footer/FooterLinks";
import FooterBottom from "../../ui/footer/FooterBottom";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-container")}>
        <div className={cx("footer-content")}>
          <div className={cx("footer-left")}>
            <FooterLeft />
          </div>
          <div className={cx("footer-right")}>
            <FooterLinks />
          </div>
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
