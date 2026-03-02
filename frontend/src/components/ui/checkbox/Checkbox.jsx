import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Checkbox = ({ checked: controlledChecked, onChange, className = "" }) => {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalChecked(e.target.checked);
    }
  };

  return (
    <div className={cx("checkboxWrapper") + (className ? ` ${className}` : "")}>
      <input
        type="checkbox"
        className={cx("checkbox")}
        checked={isChecked}
        onChange={handleChange}
      />
      {isChecked && (
        <FontAwesomeIcon icon={faCheck} className={cx("checkIcon")} />
      )}
    </div>
  );
};

export default Checkbox;
