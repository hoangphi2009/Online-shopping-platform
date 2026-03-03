import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faClipboardList,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { TABS } from "../constants";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.sidebar";

const SUB_ITEMS = [
  { tab: TABS.PROFILE, key: "profile" },
  { tab: TABS.ADDRESS, key: "address" },
  { tab: TABS.CHANGE_PASSWORD, key: "change_password" },
  { tab: TABS.NOTIFICATION, key: "notification_settings" },
  { tab: TABS.PERSONAL_INFO, key: "personal_info" },
];

const SidebarNav = ({ activeTab, accountMenuOpen, onTabChange, onToggleAccountMenu }) => {
  const { t } = useTranslation();

  return (
    <nav className={cx("sidebarNav")}>
      <button
        className={cx("navItem", { active: activeTab === TABS.NOTIFICATIONS_PAGE })}
        onClick={() => onTabChange(TABS.NOTIFICATIONS_PAGE)}
      >
        <FontAwesomeIcon icon={faBell} className={cx("navIcon")} />
        <span>{t(`${P}.notifications`)}</span>
      </button>

      <button
        className={cx("navItem", "navParent")}
        onClick={onToggleAccountMenu}
      >
        <FontAwesomeIcon icon={faUser} className={cx("navIcon")} />
        <span>{t(`${P}.my_account`)}</span>
      </button>

      {accountMenuOpen && (
        <div className={cx("navSubMenu")}>
          {SUB_ITEMS.map(({ tab, key }) => (
            <button
              key={tab}
              className={cx("subNavItem", { active: activeTab === tab })}
              onClick={() => onTabChange(tab)}
            >
              {t(`${P}.${key}`)}
            </button>
          ))}
        </div>
      )}

      <button
        className={cx("navItem", { active: activeTab === TABS.ORDERS })}
        onClick={() => onTabChange(TABS.ORDERS)}
      >
        <FontAwesomeIcon icon={faClipboardList} className={cx("navIcon")} />
        <span>{t(`${P}.orders`)}</span>
      </button>

      <button
        className={cx("navItem", { active: activeTab === TABS.VOUCHERS })}
        onClick={() => onTabChange(TABS.VOUCHERS)}
      >
        <FontAwesomeIcon icon={faTicket} className={cx("navIcon")} />
        <span>{t(`${P}.vouchers`)}</span>
      </button>
    </nav>
  );
};

export default SidebarNav;
