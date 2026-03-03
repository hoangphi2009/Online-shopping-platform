import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./placeholder.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PlaceholderPage = ({ titleKey, icon }) => {
  const { t } = useTranslation();
  const title = t(titleKey);

  return (
    <div className={cx("placeholderContent")}>
      <div className={cx("placeholderHeader")}>
        <h2 className={cx("placeholderTitle")}>{title}</h2>
        <div className={cx("divider")} />
      </div>

      <div className={cx("placeholderBody")}>
        <FontAwesomeIcon icon={icon} className={cx("placeholderIcon")} />
        <p className={cx("placeholderText")}>{title}</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
