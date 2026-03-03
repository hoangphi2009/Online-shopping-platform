import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBoxOpen,
  faLocationDot,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./orderSuccess.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const OrderSuccessPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0₫";
    return price.toLocaleString("vi-VN") + "₫";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cx("successPage")}>
      <div className={cx("card")}>
        {/* Header */}
        <div className={cx("successHeader")}>
          <FontAwesomeIcon icon={faCircleCheck} className={cx("checkIcon")} />
          <h1 className={cx("title")}>{t("components.ui.orderSuccess.title")}</h1>
          <p className={cx("subtitle")}>{t("components.ui.orderSuccess.subtitle")}</p>
          {order?.orderNumber && (
            <p className={cx("orderNumber")}>
              {t("components.ui.orderSuccess.order_number")}:{" "}
              <strong>{order.orderNumber}</strong>
            </p>
          )}
          {order?.createdAt && (
            <p className={cx("orderDate")}>{formatDate(order.createdAt)}</p>
          )}
        </div>

        {/* Order details */}
        {order && (
          <div className={cx("details")}>
            {/* Delivery address */}
            <div className={cx("detailRow")}>
              <FontAwesomeIcon icon={faLocationDot} className={cx("detailIcon")} />
              <div>
                <p className={cx("detailLabel")}>
                  {t("components.ui.orderSuccess.shipping_address")}
                </p>
                <p className={cx("detailValue")}>{order.shippingAddress}</p>
              </div>
            </div>

            {/* Payment method */}
            <div className={cx("detailRow")}>
              <FontAwesomeIcon icon={faCreditCard} className={cx("detailIcon")} />
              <div>
                <p className={cx("detailLabel")}>
                  {t("components.ui.orderSuccess.payment_method")}
                </p>
                <p className={cx("detailValue")}>
                  {order.paymentMethod === "cod"
                    ? t("components.ui.checkout.payment.cod")
                    : t("components.ui.checkout.payment.online")}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className={cx("detailRow")}>
              <FontAwesomeIcon icon={faBoxOpen} className={cx("detailIcon")} />
              <div className={cx("productListWrap")}>
                <p className={cx("detailLabel")}>
                  {t("components.ui.orderSuccess.products")} ({order.products?.length})
                </p>
                <div className={cx("productList")}>
                  {order.products?.map((item, idx) => (
                    <div key={idx} className={cx("productRow")}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className={cx("productImage")}
                        />
                      )}
                      <div className={cx("productInfo")}>
                        <span className={cx("productName")}>{item.name}</span>
                        <span className={cx("productQty")}>x{item.quantity}</span>
                      </div>
                      <span className={cx("productTotal")}>{formatPrice(item.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className={cx("totalSection")}>
              <div className={cx("totalRow")}>
                <span>{t("components.ui.orderSuccess.subtotal")}</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className={cx("totalRow")}>
                  <span>{t("components.ui.orderSuccess.discount")}</span>
                  <span className={cx("discount")}>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className={cx("totalRow", "grandTotal")}>
                <span>{t("components.ui.orderSuccess.total")}</span>
                <span className={cx("totalPrice")}>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={cx("actions")}>
          <Link to="/" className={cx("primaryBtn")}>
            {t("components.ui.orderSuccess.continue_shopping")}
          </Link>
          <button className={cx("secondaryBtn")} onClick={() => navigate("/cart")}>
            {t("components.ui.orderSuccess.back_to_cart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
