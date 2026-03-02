import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/cartSlice.js";
import { useEffect } from "react";
import { BACKEND_URL_ENDPOINT } from "../../../constants/constants";
import axios from "axios";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

const CartList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL_ENDPOINT}/cart/myCart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setProducts(res.data.cart.products));
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchCart();
  }, [accessToken, dispatch]);
  return (
    <div>
      {products.length > 0 ? (
        products.map((product, index) => (
          <CartItem key={index} product={product} />
        ))
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartList;
