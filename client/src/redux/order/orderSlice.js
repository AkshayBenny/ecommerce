import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  order: {},
  createOrderIsLoading: false,
  getOrderByUserIdRes: [],
  getOrderByUserIdResIsLoading: false,
  adminGetAllOrdersRes: [],
  adminGetAllOrdersResIsLoading: false,
  adminUpdateOrderToDeliveredRes: {},
  adminUpdateOrderToDeliveredResIsLoading: false,
  orderById: {},
  updateOrderPaymentStatus: {},
  upsLoading: false,
  oidLoading: false,
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
    const {
      data: { key: razorpayKey },
    } = await axios.get(
      'http://localhost:5000/api/order/get-razorpay-key',
      config
    )

    localStorage.setItem('razorpayKey', razorpayKey)
    localStorage.setItem('orderResult', JSON.stringify(data))
    return data
  }
)

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async ({ id }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/order/${id}`,
      config
    )

    return data
  }
)

export const getOrderByUserId = createAsyncThunk(
  'order/getOrderByUserId',
  async ({ id }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/order/user/${id}`,
      config
    )

    return data
  }
)
export const updateOrderPaymentStatus = createAsyncThunk(
  'order/updateOrderPaymentStatus',
  async ({
    orderId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/order/${orderId}/pay`,
      { razorpayPaymentId, razorpayOrderId, razorpaySignature },
      config
    )

    return data
  }
)

export const adminGetAllOrders = createAsyncThunk(
  'order/adminGetAllOrders',
  async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/admin/orders`,

      config
    )

    return data
  }
)

export const adminUpdateOrderToDelivered = createAsyncThunk(
  'order/adminUpdateOrderToDelivered',
  async ({ id }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/admin/orders/delivered/${id}`,
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
      state.createOrderIsLoading = true
    },
    [createOrder.fulfilled]: (state, action) => {
      state.createOrderIsLoading = false
      state.order = action.payload
    },
    [createOrder.rejected]: (state) => {
      state.createOrderIsLoading = true
    },
    [getOrderById.pending]: (state) => {
      state.oidLoading = true
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.oidLoading = false
      state.orderById = action.payload
    },
    [getOrderById.rejected]: (state) => {
      state.oidLoading = true
    },
    [updateOrderPaymentStatus.pending]: (state) => {
      state.upsLoading = true
    },
    [updateOrderPaymentStatus.fulfilled]: (state, action) => {
      state.upsLoading = false
      state.updateOrderPaymentStatus = action.payload
    },
    [updateOrderPaymentStatus.rejected]: (state) => {
      state.upsLoading = true
    },
    [getOrderByUserId.pending]: (state) => {
      state.getOrderByUserIdResIsLoading = true
    },
    [getOrderByUserId.fulfilled]: (state, action) => {
      state.getOrderByUserIdResIsLoading = false
      state.getOrderByUserIdRes = action.payload
    },
    [getOrderByUserId.rejected]: (state) => {
      state.getOrderByUserIdResIsLoading = true
    },
    [adminGetAllOrders.pending]: (state) => {
      state.adminGetAllOrdersResIsLoading = true
    },
    [adminGetAllOrders.fulfilled]: (state, action) => {
      state.adminGetAllOrdersResIsLoading = false
      state.adminGetAllOrdersRes = action.payload
    },
    [adminGetAllOrders.rejected]: (state) => {
      state.adminGetAllOrdersResIsLoading = true
    },

    [adminUpdateOrderToDelivered.pending]: (state) => {
      state.adminUpdateOrderToDeliveredResIsLoading = true
    },
    [adminUpdateOrderToDelivered.fulfilled]: (state, action) => {
      state.adminUpdateOrderToDeliveredResIsLoading = false
      state.adminUpdateOrderToDeliveredRes = action.payload
    },
    [adminUpdateOrderToDelivered.rejected]: (state) => {
      state.adminUpdateOrderToDeliveredResIsLoading = true
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
