import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import cartItems from '../../cartItems';

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: true,
  addToCartRes: [],
  addToCartResIsLoading: false,
  getCartRes: [],
  getCartResIsLoading: false,
}

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ cartItems }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/cart/add',
      { cartItems },
      config
    )

    return data
  }
)

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const token = userInfo.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(
    'http://localhost:5000/api/cart',

    config
  )
  localStorage.setItem('cart', JSON.stringify(data))
  return data
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      //if return is used in this reducer instead of state.cartItems = [], then it will return a new initial state, i.e., if we return {} then initialState or the new state will be set to {}
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      )
      cartItem.quantity += 1
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      )
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1
      }
    },
    calculateTotals: (state) => {
      let quantity = 0
      let total = 0
      state.cartItems.forEach((item) => {
        quantity += item.quantity
        total += item.quantity * item.price
      })
      state.quantity = quantity
      state.total = total
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.isLoading = true
      state.addToCartResIsLoading = true
    },
    [addToCart.fulfilled]: (state, action) => {
      state.isLoading = false
      state.addToCartResIsLoading = false
      state.addToCartRes = action.payload
    },
    [addToCart.rejected]: (state) => {
      state.isLoading = true
      state.addToCartResIsLoading = false
    },
    [getCart.pending]: (state) => {
      state.isLoading = true
      state.getCartResIsLoading = true
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false
      const { userProducts, totalPrice } = action.payload
      state.cartItems = userProducts
      state.total = totalPrice
      state.getCartResIsLoading = false
      state.getCartRes = action.payload
    },
    [getCart.rejected]: (state) => {
      state.isLoading = true
      state.getCartResIsLoading = true
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
