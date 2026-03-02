import styles from "./quantityControl.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const QuantityControl = ({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  className = "",
}) => {
  const handleIncrease = () => {
    if (value < max) {
      onChange?.(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange?.(newValue);
    }
  };

  return (
    <div className={`${cx("quantityControl")} ${className}`}>
      <button
        className={cx("btn", "decrease")}
        onClick={handleDecrease}
        disabled={value <= min}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        className={cx("input")}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <button
        className={cx("btn", "increase")}
        onClick={handleIncrease}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
