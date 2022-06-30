import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import cartItems from '../../cartItems';

const url = 'http://localhost:5000/api/cart/add'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async ({ cartItems }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(url, { cartItems }, config)
    localStorage.setItem('cart', JSON.stringify(data))
    return data
  }
)

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
      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      )
      if (cartItem.amount > 1) {
        cartItem.amount -= 1
      }
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = true
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
