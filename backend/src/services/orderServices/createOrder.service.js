import Order from "../../models/order.model.js";
import Cart from "../../models/cart.model.js";
import { isStockAvailable } from "../../utils/stockValidator.js";
import { generateOrderNumber } from "../../lib/helpers/orderNumberGenerator.js";
import { calculateItemPrice, calculateItemTotal } from "../../lib/calcs/priceCalculation.service.js";
import { decreaseProductStock } from "../../lib/calcs/updateStock.js";
import { increaseSoldOfProducts } from "../../lib/calcs/updateSold.js";
import { populateOrder } from "../../lib/helpers/orderPopulator.js";

const createOrderService = async (userId, orderData) => {
  // Bước 1: Validate input
  const { shippingAddress, paymentMethod, notes, discount = 0 } = orderData;
  if (!shippingAddress) {
    throw new Error("Shipping address is required");
  }

  // Bước 2: Lấy giỏ hàng hiện tại của user
  const cart = await Cart.findOne({ userId, status: 1 }).populate("products.productId");
  if (!cart || cart.products.length === 0) {
    throw new Error("Cart is empty");
  }

  // Bước 3: Lọc sản phẩm được chọn và còn tồn tại trong DB
  const selectedProducts = cart.products.filter(
    (item) => item.selected && item.productId != null
  );
  if (selectedProducts.length === 0) {
    throw new Error("No products selected");
  }

  // Bước 4: Kiểm tra tồn kho chỉ của sản phẩm được chọn
  if (!isStockAvailable(selectedProducts)) {
    throw new Error("Insufficient stock available");
  }

  // Bước 5: Sinh mã đơn hàng
  const orderNumber = generateOrderNumber();

  // Bước 6: Chuẩn bị products theo đúng schema của Order model
  const orderProducts = selectedProducts.map((item) => {
    const price = calculateItemPrice(item.productId);
    return {
      productId: item.productId._id,
      name: item.productId.name,
      image: item.productId.image[0],
      quantity: item.quantity,
      price,
      total: calculateItemTotal(price, item.quantity),
    };
  });

  // Bước 7: Tính subtotal và totalAmount
  const subtotal = orderProducts.reduce((sum, item) => sum + item.total, 0);
  const totalAmount = Math.max(0, subtotal - discount);

  // Bước 8: Tạo và lưu đơn hàng mới
  const newOrder = new Order({
    userId,
    orderNumber,
    cartId: cart._id,
    products: orderProducts,
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === "online" ? "paid" : "pending",
    orderStatus: "pending",
    subtotal,
    discount,
    totalAmount,
    notes: notes || "",
  });
  await newOrder.save();

  // Bước 9: Trừ tồn kho và tăng số lượng đã bán
  await decreaseProductStock(selectedProducts);
  await increaseSoldOfProducts(selectedProducts);

  // Bước 10: Xóa sản phẩm đã đặt khỏi giỏ hàng
  cart.products = cart.products.filter((item) => !item.selected);
  cart.totalAmount = 0;
  await cart.save();

  const populatedOrder = await populateOrder(newOrder._id);
  return populatedOrder;
};

export default createOrderService;
