import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
    },
    reducers: {
        setAllProducts(state, action) {
            state.products = action.payload;
        },
    }
});
export const { setAllProducts } = productSlice.actions;
export default productSlice.reducer;