import { useTranslation } from "react-i18next";
import { formatVal, ROLE_KEYS } from "../../../../constants.js";
import styles from "./profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.profile";

const FieldRow = ({ label, children }) => (
  <div className={cx("fieldRow")}>
    <label className={cx("fieldLabel")}>{label}</label>
    {children}
  </div>
);

const ProfileFields = ({ user, fullName }) => {
  const { t } = useTranslation();

  const roleKey = ROLE_KEYS[user?.role];
  const roleLabel = roleKey ? t(`${P}.roles.${roleKey}`) : "-";

  return (
    <div className={cx("profileFields")}>
      <FieldRow label={t(`${P}.fields.first_name`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.firstName)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.last_name`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.lastName)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.full_name`)}>
        <span className={cx("fieldValue")}>{fullName}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.email`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.email)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.phone`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.phoneNumber)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.address`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.address)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.age`)}>
        <span className={cx("fieldValue")}>{formatVal(user?.age)}</span>
      </FieldRow>

      <FieldRow label={t(`${P}.fields.role`)}>
        <span className={cx("fieldValue", "roleBadge", `role-${user?.role ?? 0}`)}>
          {roleLabel}
        </span>
      </FieldRow>
    </div>
  );
};

export default ProfileFields;
