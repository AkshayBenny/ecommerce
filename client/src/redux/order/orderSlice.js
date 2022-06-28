import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shipping: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMode: 'PayPal',
  isLoading: false,
  error: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setShippingDetails: (state, action) => {
      state.shippping = action.payload
    },
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload
    },
  },
})

export const { setShippingDetails, setPaymentMode } = orderSlice.actions

export default orderSlice.reducer
