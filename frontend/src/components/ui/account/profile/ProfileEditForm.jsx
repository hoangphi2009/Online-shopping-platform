import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../../../redux/authSlice";
import { BACKEND_URL_ENDPOINT } from "../../../../constants/constants";
import { ROLE_KEYS, SELECTABLE_ROLE_KEYS } from "../constants";
import styles from "./profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const P = "components.ui.account.profile";

const EditFieldRow = ({ label, children }) => (
  <div className={cx("fieldRow")}>
    <label className={cx("fieldLabel")}>{label}</label>
    {children}
  </div>
);

const ProfileEditForm = ({ user, fullName, onDone }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    address: user?.address ?? "",
    age: user?.age ?? "",
    role: user?.role ?? 0,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      if (avatarFile) formData.append("avatar", avatarFile);

      const { data } = await axios.patch(
        `${BACKEND_URL_ENDPOINT}/user/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setUser(data.data));
      toast.success(t(`${P}.edit.success`));
      onDone();
    } catch {
      toast.error(t(`${P}.edit.error`));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cx("profileBody")}>
      {/* Fields */}
      <div className={cx("profileFields")}>
        <EditFieldRow label={t(`${P}.fields.first_name`)}>
          <input
            className={cx("fieldInput")}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder={t(`${P}.edit.placeholder.first_name`)}
          />
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.last_name`)}>
          <input
            className={cx("fieldInput")}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder={t(`${P}.edit.placeholder.last_name`)}
          />
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.full_name`)}>
          <span className={cx("fieldValue", "fieldReadonly")}>{fullName}</span>
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.email`)}>
          <span className={cx("fieldValue", "fieldReadonly")}>
            {user?.email ?? "-"}
            <small className={cx("notEditable")}>{t(`${P}.edit.not_editable`)}</small>
          </span>
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.phone`)}>
          <input
            className={cx("fieldInput")}
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder={t(`${P}.edit.placeholder.phone`)}
          />
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.address`)}>
          <input
            className={cx("fieldInput")}
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder={t(`${P}.edit.placeholder.address`)}
          />
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.age`)}>
          <input
            className={cx("fieldInput")}
            name="age"
            type="number"
            min="1"
            max="120"
            value={form.age}
            onChange={handleChange}
            placeholder={t(`${P}.edit.placeholder.age`)}
          />
        </EditFieldRow>

        <EditFieldRow label={t(`${P}.fields.role`)}>
          <select
            className={cx("fieldInput", "roleSelect", `role-${form.role}`)}
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {Object.entries(SELECTABLE_ROLE_KEYS).map(([num, key]) => (
              <option key={num} value={Number(num)}>
                {t(`${P}.roles.${key}`)}
              </option>
            ))}
          </select>
        </EditFieldRow>

        {/* Action buttons */}
        <div className={cx("editActions")}>
          <button type="submit" className={cx("saveBtn")} disabled={submitting}>
            {submitting ? t(`${P}.edit.saving`) : t(`${P}.edit.save`)}
          </button>
          <button
            type="button"
            className={cx("cancelBtn")}
            onClick={onDone}
            disabled={submitting}
          >
            {t(`${P}.edit.cancel`)}
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div className={cx("profileAvatar")}>
        <div className={cx("avatarWrapper")} onClick={() => fileInputRef.current?.click()}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="avatar" className={cx("avatarLarge")} />
          ) : (
            <div className={cx("avatarLargePlaceholder")}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
          <div className={cx("avatarOverlay")}>
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className={cx("fileInput")}
          onChange={handleFileChange}
        />

        <button
          type="button"
          className={cx("chooseImageBtn")}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("components.ui.account.profile.avatar.choose")}
        </button>
        <p className={cx("avatarHint")}>{t("components.ui.account.profile.avatar.max_size")}</p>
        <p className={cx("avatarHint")}>{t("components.ui.account.profile.avatar.format")}</p>
      </div>
    </form>
  );
};

export default ProfileEditForm;
