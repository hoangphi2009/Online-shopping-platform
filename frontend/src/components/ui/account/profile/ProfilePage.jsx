import { useTranslation } from "react-i18next";
import ProfileFields from "./ProfileFields";
import ProfileAvatar from "./ProfileAvatar";
import ProfileEditForm from "./ProfileEditForm";
import styles from "./profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.profile";

const ProfilePage = ({ user, fullName, isEditing, onStopEditing }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("profileContent")}>
      <div className={cx("profileHeader")}>
        <h2 className={cx("profileTitle")}>{t(`${P}.title`)}</h2>
        <p className={cx("profileSubtitle")}>{t(`${P}.subtitle`)}</p>
        <div className={cx("divider")} />
      </div>

      {isEditing ? (
        <ProfileEditForm user={user} fullName={fullName} onDone={onStopEditing} />
      ) : (
        <div className={cx("profileBody")}>
          <ProfileFields user={user} fullName={fullName} />
          <ProfileAvatar avatar={user?.avatar} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
