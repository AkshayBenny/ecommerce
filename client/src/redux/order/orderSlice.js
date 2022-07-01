import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  order: {},
  address: '',
  city: '',
  postalCode: '',
  country: '',
  paymentMode: 'PayPal',
  isLoading: false,
  error: null,
}

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/order',
      {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      },
      config
    )

    return data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload
    },
    setUserAddress: (state, action) => {
      state.address = action.payload
    },
    setUserCity: (state, action) => {
      state.city = action.payload
    },
    setUserPostalCode: (state, action) => {
      state.postalCode = action.payload
    },
    setUserCountry: (state, action) => {
      state.country = action.payload
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.isLoading = true
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false
      state.order.order = action.payload
    },
    [createOrder.rejected]: (state) => {
      state.isLoading = true
    },
  },
})

export const {
  setPaymentMode,
  setUserAddress,
  setUserCity,
  setUserPostalCode,
  setUserCountry,
} = orderSlice.actions

export default orderSlice.reducer
