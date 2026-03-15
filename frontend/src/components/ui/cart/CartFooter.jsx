import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProductsSelected,
  removeSelectedProducts,
  removeUnavailableProducts,
} from "../../../redux/cartSlice";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import { toast } from "sonner";
import axios from "axios";
import Button from "../button/Button.jsx";
import Checkbox from "../checkbox/Checkbox.jsx";
import ConfirmForm from "../../shared/confirm/ConfirmForm.jsx";
import styles from "./cartFooter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CartFooter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const labels = {
    confirm: {
      title: t("components.shared.confirm.title"),
      deleteSelected: t("components.shared.confirm.delete_selected_items"),
      removeUnavailable: t(
        "components.shared.confirm.remove_unavailable_items",
      ),
    },
    toast: {
      deleteSuccess: t("components.ui.cart.footer.delete_success"),
      deleteFailed: t("components.ui.cart.footer.delete_failed"),
      removeUnavailableSuccess: t(
        "components.ui.cart.footer.remove_unavailable_success",
      ),
      noUnavailableProducts: t(
        "components.ui.cart.footer.no_unavailable_products",
      ),
      removeUnavailableFailed: t(
        "components.ui.cart.footer.remove_unavailable_failed",
      ),
    },
  };
  const allSelected =
    cartProducts.length > 0 && cartProducts.every((p) => p.selected);
  const selectedCount = cartProducts.filter((p) => p.selected).length;
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const actionsConfig = {
    delete: {
      endpoint: "/cart/products/selected",
      confirmMessage: labels.confirm.deleteSelected,
      reduxAction: removeSelectedProducts,
      successToast: labels.toast.deleteSuccess,
      failedToast: labels.toast.deleteFailed,
      shouldConfirm: () => selectedCount > 0,
    },
    removeUnavailable: {
      endpoint: "/cart/products/unavailable",
      confirmMessage: labels.confirm.removeUnavailable,
      reduxAction: removeUnavailableProducts,
      successToast: labels.toast.removeUnavailableSuccess,
      failedToast: labels.toast.removeUnavailableFailed,
      unAvailableToast: labels.toast.noUnavailableProducts,
      shouldConfirm: () => true,
    },
  };

  const handleActionWithConfirm = (actionType) => {
    const config = actionsConfig[actionType];
    if (!config.shouldConfirm()) return;
    setConfirmDialog({
      isOpen: true,
      title: labels.confirm.title,
      message: config.confirmMessage,
      onConfirm: () => executeAction(config),
    });
  };

  const executeAction = async (config) => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL_ENDPOINT}${config.endpoint}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(config.reduxAction());
        toast.success(config.successToast);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.status < 500 ? config?.unAvailableToast : config.failedToast,
      );
    } finally {
      setConfirmDialog({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
      });
    }
  };

  const handleSelectAll = async () => {
    const newSelectedState = !allSelected;
    const previousSelectedState = allSelected;

    dispatch(setAllProductsSelected(newSelectedState));

    try {
      await axios.patch(
        `${BACKEND_URL_ENDPOINT}/cart/products`,
        { selected: newSelectedState },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
    } catch (error) {
      dispatch(setAllProductsSelected(previousSelectedState));
      console.error(error);
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0₫";
    return price.toLocaleString("vi-VN") + "₫";
  };

  const actionButtons = [
    {
      key: "delete",
      label: t("components.ui.cart.footer.delete"),
      disabled: selectedCount === 0,
      onClick: () => handleActionWithConfirm("delete"),
    },
    {
      key: "removeUnavailable",
      label: t("components.ui.cart.footer.remove_unavailable"),
      onClick: () => handleActionWithConfirm("removeUnavailable"),
    },
    {
      key: "saveFavorite",
      label: t("components.ui.cart.footer.save_favorite"),
      onClick: () => {}, //@todo: làm sau
    },
  ];

  return (
    <div className={cx("cartFooter")}>
      <div className={cx("voucherSection")}>
        <FontAwesomeIcon icon={faTicket} className={cx("voucherIcon")} />
        <span className={cx("voucherText")}>
          {t("components.ui.cart.footer.voucher_title")}
        </span>
        <button type="button" className={cx("voucherButton")}>
          {t("components.ui.cart.footer.select_voucher")}
        </button>
      </div>
      <div className={cx("actionsSection")}>
        <div className={cx("leftActions")}>
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAll}
            className={cx("selectAllCheckbox")}
          />
          <span className={cx("selectAllLabel")}>
            {t("components.ui.cart.footer.select_all", {
              count: cartProducts.length,
            })}
          </span>
          <div className={cx("actionButtons")}>
            {actionButtons.map((button) => (
              <button
                key={button.key}
                type="button"
                className={cx("actionButton")}
                onClick={button.onClick}
                disabled={button.disabled}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
        <div className={cx("rightActions")}>
          <div className={cx("totalSection")}>
            <span className={cx("totalText")}>
              {t("components.ui.cart.footer.total", { count: selectedCount })}
            </span>
            <span className={cx("totalPrice")}>{formatPrice(totalAmount)}</span>
          </div>
          <Button
            className={cx("btn")}
            onClick={() => navigate("/checkout")}
            disabled={selectedCount === 0}
          >
            {t("components.ui.cart.footer.buy_now")}
          </Button>
        </div>
      </div>
      <ConfirmForm
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() =>
          setConfirmDialog({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: null,
          })
        }
      />
    </div>
  );
};

export default CartFooter;
