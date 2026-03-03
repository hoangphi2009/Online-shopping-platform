import Order from "../../models/order.model.js";
import Cart from "../../models/cart.model.js";
import { isStockAvailable } from "../../utils/stockValidator.js";
import { generateOrderNumber } from "../../lib/helpers/orderNumberGenerator.js";
import { calculateItemPrice, calculateItemTotal, calculateCartTotal } from "../../lib/calcs/priceCalculation.service.js";
import { decreaseProductStock } from "../../lib/calcs/updateStock.js";
import { increaseSoldOfProducts } from "../../lib/calcs/updateSold.js";
import { populateOrder } from "../../lib/helpers/orderPopulator.js";

const createOrderService = async (userId, orderData) => {
  // Bước 2: Lấy giỏ hàng hiện tại của user (cart)
  const cart = await Cart.findOne({ userId, status: 1 }).populate("products.productId");
  if (!cart || cart.products.length === 0) {
    throw new Error("Cart is empty");
  }
  // Bước 3: Kiểm tra tồn kho của các đơn hàng trong giỏ hàng
  if (!isStockAvailable(cart.products)) {
    throw new Error("Insufficient stock available");
  }
  const { shippingAddress, paymentMethod, notes, discount = 0 } = orderData;
  if (!shippingAddress) {
    throw new Error("Shipping address is required");
  }

  // Bước 4: Chỉ lấy sản phẩm được chọn (selected)
  const selectedProducts = cart.products.filter((item) => item.selected);
  if (selectedProducts.length === 0) {
    throw new Error("No products selected");
  }

  // Bước 5: Tính tổng giá trị đơn hàng (subtotal)
  const subtotal = calculateCartTotal(cart.products);
  const totalAmount = subtotal - discount;

  // Bước 6: Sinh mã đơn hàng
  const orderNumber = generateOrderNumber();

  // Bước 7: Chuẩn bị products theo đúng schema của Order model
  const orderProducts = selectedProducts.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    image: item.productId.image[0],
    quantity: item.quantity,
    price: calculateItemPrice(item.productId),
    total: calculateItemTotal(calculateItemPrice(item.productId), item.quantity),
  }));

  // Bước 8: Tạo 1 đơn hàng mới (new Order)
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

  // Bước 9: Trừ tồn kho và tăng số lượng bán
  await decreaseProductStock(selectedProducts);
  await increaseSoldOfProducts(selectedProducts);

  // Bước 10: Xóa các sản phẩm đã đặt khỏi giỏ hàng
  cart.products = cart.products.filter((item) => !item.selected);
  cart.totalAmount = await calculateCartTotal(cart.products);
  await cart.save();
  const populatedOrder = await populateOrder(newOrder._id);
  return populatedOrder;
};

export default createOrderService;
