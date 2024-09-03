import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProduct: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId, qty } = action.payload;
            const existingProduct = state.cartProduct.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.qty += qty;
            } else {
                state.cartProduct.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload;
            state.cartProduct = state.cartProduct.filter(product => product.productId !== productIdToRemove);
        },
        updateQuantity: (state, action) => {
            const { productId, qty } = action.payload;
            const existingProduct = state.cartProduct.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.qty = qty;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const selectItemsCart = (state) => state.cart.cartProduct;
export default cartSlice.reducer;
