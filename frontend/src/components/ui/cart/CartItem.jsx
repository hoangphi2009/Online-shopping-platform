import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import {
  updateProductSelected,
  updateProductQuantity,
  removeProduct,
} from "../../../redux/cartSlice";
import { toast } from "sonner";
import axios from "axios";
import Checkbox from "../checkbox/Checkbox";
import QuantityControl from "../quantityControl/QuantityControl";
import ConfirmForm from "../../shared/confirm/ConfirmForm";
import styles from "./cartItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CartItem = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [showConfirm, setShowConfirm] = useState(false);
  const selectedMutationRef = useRef(0);
  const quantityMutationRef = useRef(0);
  const quantityDebounceRef = useRef(null);
  const lastConfirmedQuantityRef = useRef(product.quantity);
  const API_URL = `${BACKEND_URL_ENDPOINT}/cart/products/${product.productId._id}`;

  useEffect(() => {
    return () => {
      if (quantityDebounceRef.current) {
        clearTimeout(quantityDebounceRef.current);
      }
    };
  }, []);

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0đ";
    return price.toLocaleString("vi-VN") + "đ";
  };

  const calculateTotal = () => {
    const finalPrice = product.productId.offerPrice || product.productId.price;
    return formatPrice(finalPrice * product.quantity);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(t("components.ui.cart.item.delete_success"));
        dispatch(removeProduct(product.productId._id));
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error(t("components.ui.cart.item.delete_failed"));
      console.error(error);
      setShowConfirm(false);
    }
  };

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    const productId = product.productId._id;
    const previousSelected = product.selected;
    const mutationId = ++selectedMutationRef.current;

    dispatch(
      updateProductSelected({
        productId,
        selected: isChecked,
      }),
    );

    try {
      await axios.patch(
        `${API_URL}`,
        { selected: isChecked },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
      if (mutationId === selectedMutationRef.current) {
        dispatch(
          updateProductSelected({
            productId,
            selected: previousSelected,
          }),
        );
      }
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === product.quantity) {
      return;
    }

    const mutationId = ++quantityMutationRef.current;

    dispatch(
      updateProductQuantity({
        productId: product.productId._id,
        quantity: newQuantity,
      }),
    );

    if (quantityDebounceRef.current) {
      clearTimeout(quantityDebounceRef.current);
    }

    quantityDebounceRef.current = setTimeout(async () => {
      try {
        await axios.patch(
          `${API_URL}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );

        if (mutationId === quantityMutationRef.current) {
          lastConfirmedQuantityRef.current = newQuantity;
        }
      } catch (error) {
        console.error(error);
        if (mutationId === quantityMutationRef.current) {
          dispatch(
            updateProductQuantity({
              productId: product.productId._id,
              quantity: lastConfirmedQuantityRef.current,
            }),
          );
        }
      }
    }, 180);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.productId._id}`);
  };

  return (
    <>
      <ConfirmForm
        isOpen={showConfirm}
        title={t("components.shared.confirm.title")}
        message={t("components.shared.confirm.delete_item")}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
      <div className={cx("cartItem")}>
        <div className={cx("brandSection")}>
          <Checkbox
            checked={product.selected}
            onChange={handleCheckboxChange}
          />
          <span className={cx("brandName")}>
            {product.productId.brandId.brandName}
          </span>
        </div>
        <div className={cx("productSection")}>
          <div className={cx("productInfo")}>
            <Checkbox
              checked={product.selected}
              onChange={handleCheckboxChange}
            />
            <img
              src={product.productId.image?.[0]}
              alt={product.productId.name}
              className={cx("productImage")}
            />
            <div className={cx("productDetails")} onClick={handleProductClick}>
              <h4 className={cx("productName")}>{product.productId.name}</h4>
              <div className={cx("productVariant")}>
                <span className={cx("variantLabel")}>
                  {t("components.ui.cart.item.category_label")}
                </span>
                <span className={cx("variantValue")}>
                  {product.productId.category}
                </span>
              </div>
            </div>
          </div>
          <div className={cx("productInfoGroup")}>
            <div className={cx("productPrice")}>
              {product.productId.offerPrice ? (
                <>
                  <span className={cx("originalPrice")}>
                    {formatPrice(product.productId.price)}
                  </span>
                  <span className={cx("currentPrice")}>
                    {formatPrice(product.productId.offerPrice)}
                  </span>
                </>
              ) : (
                <span className={cx("currentPrice")}>
                  {formatPrice(product.productId.price)}
                </span>
              )}
            </div>
            <div className={cx("productQuantity")}>
              <QuantityControl
                value={product.quantity}
                onChange={handleQuantityChange}
                min={1}
                max={product.productId.stock}
              />
            </div>
            <div className={cx("productTotal")}>
              <span className={cx("totalPrice")}>{calculateTotal()}</span>
            </div>
            <div className={cx("productActions")}>
              <button
                className={cx("deleteButton")}
                onClick={() => setShowConfirm(true)}
              >
                {t("components.ui.cart.item.delete")}
              </button>
              <button className={cx("favoriteButton")}>
                {t("components.ui.cart.item.similar")}
              </button>
            </div>
          </div>
        </div>
        <div className={cx("voucherSection")}>
          <FontAwesomeIcon icon={faTicket} className={cx("voucherIcon")} />
          <span className={cx("voucherText")}>
            {t("components.ui.cart.item.add_voucher")}
          </span>
        </div>
        <div className={cx("deliverySection")}>
          <FontAwesomeIcon icon={faTruck} className={cx("deliveryIcon")} />
          <span className={cx("deliveryText")}>
            {t("components.ui.cart.item.shipping_discount", {
              amount: "500.000đ",
              minimum: "0đ",
            })}
          </span>
          <Link to="/learn-more" className={cx("learnMore")}>
            {t("components.ui.cart.item.learn_more")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartItem;
