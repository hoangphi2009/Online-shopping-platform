import { useState } from "react";
import styles from "./RequireTag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const RequireTag = ({
  required,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  validateFn,
  externalError,
  className,
}) => {
  const [internalError, setInternalError] = useState(null);

  if (required) {
    return <span className={cx("requiredMark")}>*</span>;
  }

  const activeError = externalError || internalError;

  const handleChange = (e) => {
    if (internalError) setInternalError(null);
    onChange?.(e);
  };

  const handleBlur = () => {
    if (!validateFn) return;
    const err = validateFn(value);
    setInternalError(err || null);
  };

  return (
    <div className={cx("inputWrapper")}>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        className={`${className ?? ""}${activeError ? ` ${cx("fieldError")}` : ""}`}
      />
      {activeError && <span className={cx("requireTag")}>{activeError}</span>}
    </div>
  );
};

export default RequireTag;
