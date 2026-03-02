import styles from "./reviewList.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";

const cx = classNames.bind(styles);
const sampleReview = [
  {
    _id: "674c9f1e2345678901234567",
    userId: {
      _id: "674c9f1e1234567890123456",
      name: "Nguyễn Văn A",
      avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    productId: "674c9f1e9876543210987654",
    orderId: "674c9f1e5555666677778888",
    rating: 5,
    comment:
        "Sản phẩm tuyệt vời, chất lượng rất tốt. Giao hàng nhanh, đóng gói cẩn thận.",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    ],
    createdAt: "2025-11-20T09:31:00.000Z",
    updatedAt: "2025-11-20T09:31:00.000Z",
  }
];

const ReviewList = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const totalReviews = sampleReview.length;
  const averageRating = (
      sampleReview.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  ).toFixed(1);

  const ratingStats = {
    5: sampleReview.filter((r) => r.rating === 5).length,
    4: sampleReview.filter((r) => r.rating === 4).length,
    3: sampleReview.filter((r) => r.rating === 3).length,
    2: sampleReview.filter((r) => r.rating === 2).length,
    1: sampleReview.filter((r) => r.rating === 1).length,
  };
  const reviewsWithImages = sampleReview.filter(
    (r) => r.images && r.images.length > 0
  ).length;

  const reviewsWithComments = sampleReview.filter((r) => r.comment).length;
  const query = (review) => {
    if (selectedFilter === "all") return true;
    else if (selectedFilter === "images") {
      return review.images && review.images.length > 0;
    }
    return review.rating === parseInt(selectedFilter);
  };
  const filteredReviews = sampleReview.filter((review) => query(review));

  return (
    <div className={cx("reviews-container")}>
      <h2 className={cx("section-title")}>
        {t("components.ui.product.reviews.title")}
      </h2>
      <ReviewSummary
        averageRating={averageRating}
        ratingStats={ratingStats}
        reviewsWithImages={reviewsWithImages}
        reviewsWithComments={reviewsWithComments}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <div className={cx("reviews-list")}>
        {filteredReviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
