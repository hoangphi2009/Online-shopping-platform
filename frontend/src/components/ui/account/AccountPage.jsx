import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  faBell,
  faLocationDot,
  faLock,
  faGear,
  faIdCard,
  faClipboardList,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import AccountSidebar from "./sidebar/AccountSidebar";
import ProfilePage from "./profile/ProfilePage";
import PlaceholderPage from "./placeholder/PlaceholderPage";
import { TABS, getFullName } from "../../../constants.js";
import styles from "./accountPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const S = "components.ui.account.sidebar";

const CONTENT_MAP = {
  [TABS.ADDRESS]: { titleKey: `${S}.address`, icon: faLocationDot },
  [TABS.CHANGE_PASSWORD]: { titleKey: `${S}.change_password`, icon: faLock },
  [TABS.NOTIFICATION]: { titleKey: `${S}.notification_settings`, icon: faGear },
  [TABS.PERSONAL_INFO]: { titleKey: `${S}.personal_info`, icon: faIdCard },
  [TABS.ORDERS]: { titleKey: `${S}.orders`, icon: faClipboardList },
  [TABS.VOUCHERS]: { titleKey: `${S}.vouchers`, icon: faTicket },
  [TABS.NOTIFICATIONS_PAGE]: { titleKey: `${S}.notifications`, icon: faBell },
};

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [accountMenuOpen, setAccountMenuOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fullName = getFullName(user, i18n.language);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setActiveTab(TABS.PROFILE);
    setIsEditing(true);
  };

  const renderContent = () => {
    if (activeTab === TABS.PROFILE) {
      return (
        <ProfilePage
          user={user}
          fullName={fullName}
          isEditing={isEditing}
          onStopEditing={() => setIsEditing(false)}
        />
      );
    }
    const meta = CONTENT_MAP[activeTab];
    return meta ? <PlaceholderPage titleKey={meta.titleKey} icon={meta.icon} /> : null;
  };

  return (
    <div className={cx("accountPage")}>
      <div className={cx("container")}>
        <AccountSidebar
          fullName={fullName}
          avatar={user?.avatar}
          activeTab={activeTab}
          accountMenuOpen={accountMenuOpen}
          onTabChange={handleTabChange}
          onToggleAccountMenu={() => setAccountMenuOpen((prev) => !prev)}
          onEditProfile={handleEditProfile}
        />

        <main className={cx("content")}>{renderContent()}</main>
      </div>
    </div>
  );
};

export default AccountPage;
