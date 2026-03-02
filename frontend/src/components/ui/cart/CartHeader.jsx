import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductSelected,
  calculateTotalAmount,
} from "../../../redux/cartSlice";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import axios from "axios";
import styles from "./cartHeader.module.scss";
import classNames from "classnames/bind";
import Checkbox from "../checkbox/Checkbox.jsx";

const cx = classNames.bind(styles);

const CartHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const allSelected = products.length > 0 && products.every((p) => p.selected);

  const handleSelectAll = async () => {
    const newSelectedState = !allSelected;
    try {
      const res = await axios.patch(
        `${BACKEND_URL_ENDPOINT}/cart/products`,
        { selected: newSelectedState },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        products.forEach((product) => {
          dispatch(
            updateProductSelected({
              productId: product.productId._id,
              selected: newSelectedState,
            })
          );
        });
        dispatch(calculateTotalAmount());
      }
    } catch (error) {
      console.error("Lỗi cập nhật select all:", error);
    }
  };
  const headerInfo = [
    { label: t("components.ui.cart.header.unit_price"), width: "15%" },
    { label: t("components.ui.cart.header.quantity"), width: "15%" },
    { label: t("components.ui.cart.header.total_price"), width: "15%" },
    { label: t("components.ui.cart.header.actions"), width: "15%" },
  ];
  return (
    <div className={cx("cartHeader")}>
      <div className={cx("productSection")}>
        <div className={cx("checkboxContainer")}>
          <Checkbox checked={allSelected} onChange={handleSelectAll} />
        </div>
        <div className={cx("productLabel")}>
          <span>{t("components.ui.cart.header.product")}</span>
        </div>
      </div>
      <div className={cx("headerInfo")}>
        {headerInfo.map((item, index) => (
          <div
            key={index}
            className={cx("headerItem")}
            style={{ width: item.width }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartHeader;
