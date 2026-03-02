import { createSlice } from "@reduxjs/toolkit";

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
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    updateProductSelected: (state, action) => {
      const { productId, selected } = action.payload;
      const product = state.products.find((p) => p.productId._id === productId);
      if (product) {
        product.selected = selected;
      }
    },
    calculateTotalAmount: (state) => {
      state.totalAmount = state.products.reduce((total, product) => {
        if (product.selected) {
          const price = product.productId.offerPrice || product.productId.price;
          return total + price * product.quantity;
        }
        return total;
      }, 0);
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.productId._id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (p) => p.productId._id !== productId
      );
    },
    removeSelectedProducts: (state) => {
      state.products = state.products.filter((p) => !p.selected);
    },
    removeUnavailableProducts: (state) => {
      state.products = state.products.filter(
        (p) => p.productId && p.productId.stock > 0
      );
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (p) => p.productId._id === newProduct.productId._id
      );
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        existingProduct.selected = newProduct.selected;
      } else {
        state.products.push(newProduct);
      }
    },
  },
});

export const {
  clearCart,
  setProducts,
  setTotalAmount,
  updateProductSelected,
  calculateTotalAmount,
  updateProductQuantity,
  removeProduct,
  removeSelectedProducts,
  removeUnavailableProducts,
  addProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
