import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/cartPopSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    popup: popupReducer,
    user:userReducer
  },
})