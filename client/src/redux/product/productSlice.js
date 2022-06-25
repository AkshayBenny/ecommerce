import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  product: {},
  isLoading: false,
  error: null,
}

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
    return data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.isLoading = true
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false
      state.product = action.payload
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})



export default productSlice.reducer
