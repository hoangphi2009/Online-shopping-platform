import styles from "./reviewItem.module.scss";
import classNames from "classnames/bind";
import RatingStars from "./RatingStars";

const cx = classNames.bind(styles);

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };
  return (
    <div className={cx("review-item")}>
      <div className={cx("review-header")}>
        <div className={cx("user-info")}>
          <img
            src={review.userId.avatar}
            alt={review.userId.name}
            className={cx("user-avatar")}
          />
          <div className={cx("user-details")}>
            <span className={cx("user-name")}>{review.userId.name}</span>
            <div className={cx("review-meta")}>
              <RatingStars rating={review.rating} size="small" />
              <span className={cx("review-date")}>
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("review-content")}>
        <div className={cx("review-text")}>
          <p className={cx("main-comment")}>{review.comment}</p>
        </div>

        {review.images && review.images.length > 0 && (
          <div className={cx("review-images")}>
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className={cx("review-image")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
