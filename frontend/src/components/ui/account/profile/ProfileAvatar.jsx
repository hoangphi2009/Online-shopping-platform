import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.profile.avatar";

const ProfileAvatar = ({ avatar }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("profileAvatar")}>
      <div className={cx("avatarWrapper")}>
        {avatar ? (
          <img src={avatar} alt="avatar" className={cx("avatarLarge")} />
        ) : (
          <div className={cx("avatarLargePlaceholder")}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
        <div className={cx("avatarOverlay")}>
          <FontAwesomeIcon icon={faCamera} />
        </div>
      </div>

      <button className={cx("chooseImageBtn")}>{t(`${P}.choose`)}</button>
      <p className={cx("avatarHint")}>{t(`${P}.max_size`)}</p>
      <p className={cx("avatarHint")}>{t(`${P}.format`)}</p>
    </div>
  );
};

export default ProfileAvatar;
