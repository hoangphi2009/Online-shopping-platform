import styles from "./backButton.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const BackButton = ({ onClick, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
      onClick && onClick();
      navigate('/');
  };

  return (
    <button className={cx("back-button", className)} onClick={handleClick}>
      <span className={cx("back-icon")}>←</span>
      <span className={cx("back-text")}>{t("components.ui.button.back")}</span>
    </button>
  );
};

export default BackButton;
