import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  isLoading: false,
  error: null,
}

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    const { data } = await axios.get('http://localhost:5000/api/products')
    return data
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    [getAllProducts.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

// console.log(cartSlice);

export default productSlice.reducer
