import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, variant } = action.payload;
      const existingItem = state.items.find(
        item => item.product._id === product._id && 
        (!variant || JSON.stringify(item.variant) === JSON.stringify(variant))
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          variant,
        });
      }

      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      const { productId, variant } = action.payload;
      state.items = state.items.filter(
        item => !(item.product._id === productId && 
        (!variant || JSON.stringify(item.variant) === JSON.stringify(variant)))
      );
      
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, variant } = action.payload;
      const item = state.items.find(
        item => item.product._id === productId && 
        (!variant || JSON.stringify(item.variant) === JSON.stringify(variant))
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            item => !(item.product._id === productId && 
            (!variant || JSON.stringify(item.variant) === JSON.stringify(variant)))
          );
        } else {
          item.quantity = quantity;
        }
      }

      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    loadCart: (state, action) => {
      state.items = action.payload.items || [];
      state.total = action.payload.total || 0;
      state.itemCount = action.payload.itemCount || 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;

export default cartSlice.reducer; 