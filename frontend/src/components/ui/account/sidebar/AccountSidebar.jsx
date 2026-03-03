import SidebarUser from "./SidebarUser";
import SidebarNav from "./SidebarNav";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AccountSidebar = ({
  fullName,
  avatar,
  activeTab,
  accountMenuOpen,
  onTabChange,
  onToggleAccountMenu,
  onEditProfile,
}) => (
  <aside className={cx("sidebar")}>
    <SidebarUser
      fullName={fullName}
      avatar={avatar}
      onTabChange={onTabChange}
      onEditProfile={onEditProfile}
    />
    <SidebarNav
      activeTab={activeTab}
      accountMenuOpen={accountMenuOpen}
      onTabChange={onTabChange}
      onToggleAccountMenu={onToggleAccountMenu}
    />
  </aside>
);

export default AccountSidebar;
