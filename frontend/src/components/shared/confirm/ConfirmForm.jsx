import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import styles from "./confirmForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ConfirmForm = ({ title, message, onConfirm, onCancel, isOpen }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleOnClick = (onConfirm) => {
    if (!user) {
      toast.error(t("components.shared.confirm.login_required"));
      navigate("/login");
      return;
    }
    onConfirm();
  }
  return (
    <div className={cx("confirmOverlay")} onClick={onCancel}>
      <div className={cx("confirmDialog")} onClick={(e) => e.stopPropagation()}>
        <h3 className={cx("confirmTitle")}>
          {title}
        </h3>
        <p className={cx("confirmMessage")}>
          {message}
        </p>
        <div className={cx("confirmActions")}>
          <button className={cx("cancelButton")} onClick={onCancel}>
            {t("components.shared.confirm.cancel")}
          </button>
          <button className={cx("confirmButton")} onClick={() => handleOnClick(onConfirm)}>
            {t("components.shared.confirm.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
