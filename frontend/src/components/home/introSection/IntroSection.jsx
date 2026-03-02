import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import IntroSectionImage from "../../../assets/intro-section-image.png";
import styles from "./introSection.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const IntroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section
      className={cx("intro-section")}
      style={{ backgroundImage: `url(${IntroSectionImage})` }}
    >
      <div className={cx("intro-overlay")}>
        <div className={cx("intro-content")}>
          <h1 className={cx("intro-title")}>
            <span className={cx("line")}>{t("components.shared.intro.welcome_text")}</span>
            <span className={cx("line", "highlight")}>{t("components.shared.intro.highlight_text")}</span>
          </h1>
          <div className={cx("btn-quick-links")}>
            <button className={cx("btn", "btn-primary")} onClick={() => navigate('/shop')}>{t("components.shared.intro.shop_now")}</button>
            <button className={cx("btn", "btn-secondary")} onClick={() => navigate('/learn-more')}>{t("components.shared.intro.learn_more")}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;