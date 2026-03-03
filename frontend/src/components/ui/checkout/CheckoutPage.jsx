import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTruck,
  faMoneyBill,
  faCreditCard,
  faTag,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import { removeSelectedProducts, calculateTotalAmount } from "../../../redux/cartSlice";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const cartProducts = useSelector((state) => state.cart.products);

  const selectedProducts = cartProducts.filter((p) => p.selected);

  const [form, setForm] = useState({
    recipientName: user ? `${user.firstName} ${user.lastName}`.trim() : "",
    phone: user?.phoneNumber || "",
    address: user?.address || "",
    paymentMethod: "cod",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0₫";
    return price.toLocaleString("vi-VN") + "₫";
  };

  const subtotal = selectedProducts.reduce((total, item) => {
    const price = item.productId.offerPrice || item.productId.price;
    return total + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.recipientName.trim()) {
      toast.error(t("components.ui.checkout.errors.recipient_required"));
      return;
    }
    if (!form.phone.trim()) {
      toast.error(t("components.ui.checkout.errors.phone_required"));
      return;
    }
    if (!form.address.trim()) {
      toast.error(t("components.ui.checkout.errors.address_required"));
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error(t("components.ui.checkout.errors.no_products"));
      return;
    }

    const shippingAddress = `${form.recipientName} | ${form.phone} | ${form.address}`;

    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL_ENDPOINT}/order`,
        {
          shippingAddress,
          paymentMethod: form.paymentMethod,
          notes: form.notes,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(removeSelectedProducts());
        dispatch(calculateTotalAmount());
        navigate("/order-success", { state: { order: res.data.order } });
      }
    } catch (error) {
      const msg = error.response?.data?.message;
      toast.error(msg || t("components.ui.checkout.errors.submit_failed"));
    } finally {
      setLoading(false);
    }
  };

  if (selectedProducts.length === 0) {
    return (
      <div className={cx("emptyCheckout")}>
        <p>{t("components.ui.checkout.errors.no_products")}</p>
        <button className={cx("backBtn")} onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faChevronLeft} />
          {t("components.ui.checkout.back_to_cart")}
        </button>
      </div>
    );
  }

  return (
    <div className={cx("checkoutPage")}>
      <div className={cx("pageHeader")}>
        <button className={cx("backBtn")} onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faChevronLeft} />
          {t("components.ui.checkout.back_to_cart")}
        </button>
        <h1 className={cx("pageTitle")}>{t("components.ui.checkout.title")}</h1>
      </div>

      <form className={cx("checkoutLayout")} onSubmit={handleSubmit} noValidate>
        {/* LEFT — FORM */}
        <div className={cx("leftCol")}>
          {/* Delivery address */}
          <section className={cx("section")}>
            <h2 className={cx("sectionTitle")}>
              <FontAwesomeIcon icon={faLocationDot} className={cx("sectionIcon")} />
              {t("components.ui.checkout.delivery.title")}
            </h2>
            <div className={cx("formRow")}>
              <div className={cx("formGroup")}>
                <label className={cx("label")}>
                  {t("components.ui.checkout.delivery.recipient_name")}
                  <span className={cx("required")}>*</span>
                </label>
                <input
                  className={cx("input")}
                  type="text"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  placeholder={t("components.ui.checkout.delivery.recipient_placeholder")}
                />
              </div>
              <div className={cx("formGroup")}>
                <label className={cx("label")}>
                  {t("components.ui.checkout.delivery.phone")}
                  <span className={cx("required")}>*</span>
                </label>
                <input
                  className={cx("input")}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("components.ui.checkout.delivery.phone_placeholder")}
                />
              </div>
            </div>
            <div className={cx("formGroup")}>
              <label className={cx("label")}>
                {t("components.ui.checkout.delivery.address")}
                <span className={cx("required")}>*</span>
              </label>
            <textarea
              className={cx("textarea")}
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={4}
              placeholder={t("components.ui.checkout.delivery.address_placeholder")}
            />
            </div>
          </section>

          {/* Payment method */}
          <section className={cx("section")}>
            <h2 className={cx("sectionTitle")}>
              <FontAwesomeIcon icon={faCreditCard} className={cx("sectionIcon")} />
              {t("components.ui.checkout.payment.title")}
            </h2>
            <div className={cx("paymentOptions")}>
              <label className={cx("paymentOption", { selected: form.paymentMethod === "cod" })}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                <FontAwesomeIcon icon={faMoneyBill} className={cx("paymentIcon")} />
                <div>
                  <span className={cx("paymentLabel")}>{t("components.ui.checkout.payment.cod")}</span>
                  <span className={cx("paymentDesc")}>{t("components.ui.checkout.payment.cod_desc")}</span>
                </div>
              </label>
              <label className={cx("paymentOption", "disabled")}>
                <input type="radio" name="paymentMethod" value="online" disabled />
                <FontAwesomeIcon icon={faCreditCard} className={cx("paymentIcon")} />
                <div>
                  <span className={cx("paymentLabel")}>{t("components.ui.checkout.payment.online")}</span>
                  <span className={cx("paymentDesc", "comingSoon")}>
                    {t("components.ui.checkout.payment.coming_soon")}
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Notes */}
          <section className={cx("section")}>
            <h2 className={cx("sectionTitle")}>
              <FontAwesomeIcon icon={faTag} className={cx("sectionIcon")} />
              {t("components.ui.checkout.notes.title")}
            </h2>
            <textarea
              className={cx("textarea")}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              placeholder={t("components.ui.checkout.notes.placeholder")}
            />
          </section>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className={cx("rightCol")}>
          <section className={cx("section", "summary")}>
            <h2 className={cx("sectionTitle")}>
              <FontAwesomeIcon icon={faTruck} className={cx("sectionIcon")} />
              {t("components.ui.checkout.summary.title")} ({selectedProducts.length})
            </h2>

            <div className={cx("productList")}>
              {selectedProducts.map((item) => {
                const price = item.productId.offerPrice || item.productId.price;
                return (
                  <div key={item.productId._id} className={cx("productRow")}>
                    <div className={cx("productInfo")}>
                      <img
                        src={item.productId.image?.[0]}
                        alt={item.productId.name}
                        className={cx("productImage")}
                      />
                      <div className={cx("productDetails")}>
                        <p className={cx("productName")}>{item.productId.name}</p>
                        <p className={cx("productQty")}>x{item.quantity}</p>
                      </div>
                    </div>
                    <span className={cx("productTotal")}>{formatPrice(price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>

            <div className={cx("summaryRow")}>
              <span>{t("components.ui.checkout.summary.subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={cx("summaryRow")}>
              <span>{t("components.ui.checkout.summary.shipping")}</span>
              <span className={cx("freeShipping")}>{t("components.ui.checkout.summary.free")}</span>
            </div>
            <div className={cx("summaryRow", "total")}>
              <span>{t("components.ui.checkout.summary.total")}</span>
              <span className={cx("totalPrice")}>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="submit"
              className={cx("submitBtn")}
              disabled={loading}
            >
              {loading
                ? t("components.ui.checkout.placing_order")
                : t("components.ui.checkout.place_order")}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
