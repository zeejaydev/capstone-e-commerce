import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/cartPopSlice';
import cartReducer from './slices/cartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    popup: popupReducer 
  },
})