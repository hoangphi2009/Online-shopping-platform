import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalAmount, addProduct } from "../../../redux/cartSlice";
import { toast } from "sonner";
import styles from "./productDetail.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import ProductImage from "./ProductImage";
import ProductStats from "./ProductStats";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";
import HotBadge from "./../../../utils/HotBadge";
import ConfirmForm from "../../shared/confirm/ConfirmForm";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${BACKEND_URL_ENDPOINT}/product/${productId}`,
          { withCredentials: true }
        );
        console.log("Product details response:", res.data);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const addToCartHandler = async (productId, selected = false) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL_ENDPOINT}/cart/products`,
        {
          products: [
            {
              productId,
              quantity: selectedQuantity,
              price: product.price,
              selected: selected,
            },
          ],
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(t("components.ui.product.add_to_cart_success"));
        const newCartItem = {
          productId: product,
          quantity: selectedQuantity,
          selected: selected,
        };
        dispatch(addProduct(newCartItem));
        dispatch(calculateTotalAmount());
        navigate("/cart");
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(t("components.ui.product.add_to_cart_error"));
    }
  };

  const handleAddToCart = (productId) => addToCartHandler(productId, false);
  const handleBuyNow = (productId) => addToCartHandler(productId, true);

  if (loading) {
    return (
      <div className={cx("productDescriptionDetail-detail-container")}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={cx("productDescriptionDetail-detail-container")}>
        <div>{error || "Product not found"}</div>
      </div>
    );
  }

  return (
    <div className={cx("productDescriptionDetail-detail-container")}>
      <div className={cx("image-section")}>
        <ProductImage images={product?.image} />
      </div>
      <div className={cx("info-section")}>
        <div className={cx("title-section")}>
          {product?.bestseller && (
            <HotBadge text={t("components.ui.product.favorite_badge")} />
          )}
          <h1 className={cx("productDescriptionDetail-title")}>
            {product?.name}
          </h1>
        </div>
        <ProductStats
          rating={product?.rating}
          reviews={product?.reviewCount}
          sold={product?.sold}
        />
        <ProductPrice price={product?.price} offerPrice={product?.offerPrice} />
        <div className={cx("description-section")}>
          <h3 className={cx("section-title")}>
            {t("components.ui.product.description_title")}
          </h3>
          <p className={cx("productDescriptionDetail-description")}>
            {product?.description}
          </p>
        </div>
        <ProductQuantity
          stock={product?.stock}
          onQuantityChange={setSelectedQuantity}
        />
        <ProductActions
          onAddToCart={() => setShowConfirm(true)}
          onBuyNow={() => handleBuyNow(productId)}
          isOutOfStock={product?.stock === 0}
        />
      </div>
      <ConfirmForm
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        title={t("components.shared.confirm.title")}
        message={t("components.shared.confirm.add_to_cart")}
        onConfirm={() => handleAddToCart(productId)}
      />
    </div>
  );
};

export default ProductDetail;
