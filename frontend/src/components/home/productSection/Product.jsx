import React from "react";
import styles from "./product.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import HotBadge from "../../../utils/HotBadge.jsx";

const cx = classNames.bind(styles);

const Product = ({ product, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className={cx("product-card")}>
      <div className={cx("badge-number")}>#{index}</div>

      <div className={cx("image-container")}>
        <img src={product.image?.[0]} alt={product.name} />
      </div>

      <div className={cx("product-info")}>
        <div className={cx("category-badge-wrapper")}>
          <div className={cx("category")}>{product.category?.name}</div>
          {product.bestseller && (
            <div className={cx("product-badge")}>
              <HotBadge text={t("components.home.products.hot")} />
            </div>
          )}
        </div>

        <div className={cx("product-name-unit-wrapper")}>
          <h3 className={cx("product-name")}>{product.name}</h3>
          <span className={cx("product-unit")}>
            ({t("components.home.products.unit")}: {product.unit})
          </span>
        </div>

        <div className={cx("rating")}>
          <div className={cx("stars")}>
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.averageRating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className={cx("rating-value")}>
            ({product.averageRating.toFixed(1)})
          </span>
        </div>

        <div className={cx("price-container")}>
          {product.offerPrice ? (
            <span className={cx("current-price")}>{product.offerPrice}₫</span>
          ) : (
            <span className={cx("current-price")}>{product.price}₫</span>
          )}
          {product.offerPrice && (
            <span className={cx("old-price")}>{product.price}₫</span>
          )}
        </div>

        {/* Stock */}
        <div
          className={cx("stock-info", {
            "in-stock": product.stock > 10,
            "low-stock": product.stock > 0 && product.stock <= 10,
            "out-of-stock": product.stock === 0,
          })}
        >
          {product.stock > 0 ? (
            <>
              <FontAwesomeIcon icon={faCheck} />
              <span>
                {t("components.home.products.stock_available", {
                  count: product.stock,
                })}
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faXmark} />
              <span>{t("components.home.products.out_of_stock")}</span>
            </>
          )}
        </div>

        <button className={cx("add-to-cart-btn")} onClick={handleViewDetail}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {t("components.home.products.get_more_information")}
        </button>
      </div>
    </div>
  );
};

export default Product;
