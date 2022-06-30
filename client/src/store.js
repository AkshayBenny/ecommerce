import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './redux/product/productsSlice'
import productReducer from './redux/product/productSlice'
import cartReducer from './redux/cart/cartSlice'
import userReducer from './redux/user/userSlice'
import shippingReducer from './redux/order/orderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    shipping: shippingReducer,
  },
})
