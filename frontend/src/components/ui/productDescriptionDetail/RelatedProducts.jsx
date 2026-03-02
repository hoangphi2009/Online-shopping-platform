import styles from "./relatedProducts.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Product from "../../home/productSection/Product";

const cx = classNames.bind(styles);
const sampleProduct = [
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
        image: [
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
        ],
        name: "Yonex Arcsaber 11",
        category: "Badminton",
        price: 4500000,
        offerPrice: 3800000,
        stock: 25,
        unit: "cái",
        averageRating: 5,
        bestseller: true,
        createdAt: "2025-11-20T09:31:00.000Z",
        updatedAt: "2025-11-20T09:31:00.000Z",
    }
];

const RelatedProducts = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = sampleProduct;
  const hasMoreProducts = sampleProduct.length > 4;

  return (
    <div className={cx("related-products-container")}>
      <h2 className={cx("section-title")}>
        {t("components.ui.product.related_products.title")}
      </h2>
      <div className={cx("products-grid")}>
        {displayedProducts.map((product, index) => (
          <Product key={product._id} product={product} index={index + 1} />
        ))}
      </div>
      {hasMoreProducts && !showAll && (
        <div className={cx("view-more-container")}>
          <button
            className={cx("view-more-btn")}
            onClick={() => setShowAll(true)}
          >
            {t("components.ui.product.related_products.view_more")}
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
