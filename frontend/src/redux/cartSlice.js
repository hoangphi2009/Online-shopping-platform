import { createSlice } from "@reduxjs/toolkit";

const recalculateTotalAmount = (products) => {
  return products.reduce((total, product) => {
    if (!product.selected) {
      return total;
    }
    const price = product.productId.offerPrice || product.productId.price;
    return total + price * product.quantity;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalAmount: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    updateProductSelected: (state, action) => {
      const { productId, selected } = action.payload;
      const product = state.products.find((p) => p.productId._id === productId);
      if (product) {
        product.selected = selected;
        state.totalAmount = recalculateTotalAmount(state.products);
      }
    },
    setAllProductsSelected: (state, action) => {
      const selected = action.payload;
      state.products.forEach((product) => {
        product.selected = selected;
      });
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    calculateTotalAmount: (state) => {
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.productId._id === productId);
      if (product) {
        product.quantity = quantity;
        state.totalAmount = recalculateTotalAmount(state.products);
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (p) => p.productId._id !== productId,
      );
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    removeSelectedProducts: (state) => {
      state.products = state.products.filter((p) => !p.selected);
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    removeUnavailableProducts: (state) => {
      state.products = state.products.filter(
        (p) => p.productId && p.productId.stock > 0,
      );
      state.totalAmount = recalculateTotalAmount(state.products);
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (p) => p.productId._id === newProduct.productId._id,
      );
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        existingProduct.selected = newProduct.selected;
      } else {
        state.products.push(newProduct);
      }
      state.totalAmount = recalculateTotalAmount(state.products);
    },
  },
});

export const {
  clearCart,
  setProducts,
  setTotalAmount,
  updateProductSelected,
  setAllProductsSelected,
  calculateTotalAmount,
  updateProductQuantity,
  removeProduct,
  removeSelectedProducts,
  removeUnavailableProducts,
  addProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
