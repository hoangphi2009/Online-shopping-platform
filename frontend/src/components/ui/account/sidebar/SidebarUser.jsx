import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.sidebar";

const SidebarUser = ({ fullName, avatar, onEditProfile }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("sidebarUser")}>
      <div className={cx("sidebarAvatar")}>
        {avatar ? (
          <img src={avatar} alt="avatar" className={cx("avatarImg")} />
        ) : (
          <div className={cx("avatarPlaceholder")}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>

      <div className={cx("sidebarUserInfo")}>
        <span className={cx("sidebarUsername")}>{fullName}</span>
        <button className={cx("sidebarEditLink")} onClick={onEditProfile}>
          <FontAwesomeIcon icon={faPencil} />
          <span>{t(`${P}.edit_profile`)}</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarUser;
