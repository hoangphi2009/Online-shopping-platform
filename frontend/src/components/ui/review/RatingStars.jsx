import styles from "./ratingStars.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const RatingStars = ({ rating, size = "medium" }) => {
  return (
    <div className={cx("stars", size)}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={cx("star", { filled: index < rating })}>
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
