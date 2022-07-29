import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  allProductsAdmin: [],
  adminDeleteProductByIdIsLoading: false,
  adminCreateProduct: {},
  adminCreatedProduct: {},
  adminCreateProductIsLoading: false,
  adminUpdateProduct: {},
  adminUpdateProductRedirect: false,
  adminUpdateProductIsLoading: false,
  adminUpdatedProduct: {},
  adminProductById: {},
  adminProductByIdIsLoading: false,
  allProductsAdminIsLoading: false,
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

export const getAllProductsAdmin = createAsyncThunk(
  'user/getAllProductsAdmin',
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
      'http://localhost:5000/api/admin/products',

      config
    )

    return data
  }
)

export const getProductByIdAdmin = createAsyncThunk(
  'user/getProductByIdAdmin',
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
      `http://localhost:5000/api/admin/products/${id}`,

      config
    )

    return data
  }
)

export const adminDeleteProductById = createAsyncThunk(
  'user/adminDeleteProductById',
  async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    await axios.delete(
      `http://localhost:5000/api/admin/products/${id}`,

      config
    )
  }
)
export const adminUpdateProduct = createAsyncThunk(
  'user/adminUpdateProduct',
  async ({ id, productData }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/admin/products/${id}`,
      { productData },
      config
    )
    return data
  }
)
export const adminCreateProduct = createAsyncThunk(
  'user/adminCreateProduct',
  async ({ productData }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      `http://localhost:5000/api/admin/products`,
      { productData },
      config
    )
    return data
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAdminCreatedProduct: (state, action) => {
      state.adminCreatedProduct = action.payload
    },
    setAdminUpdatedProduct: (state, action) => {
      state.adminUpdatedProduct = action.payload
    },
  },
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
    [getAllProductsAdmin.pending]: (state) => {
      state.allProductsAdminIsLoading = true
    },
    [getAllProductsAdmin.fulfilled]: (state, action) => {
      state.allProductsAdminIsLoading = false
      state.allProductsAdmin = action.payload
    },
    [getAllProductsAdmin.rejected]: (state, action) => {
      state.allProductsAdminIsLoading = false
      state.error = action.payload
    },
    [getProductByIdAdmin.pending]: (state) => {
      state.adminProductByIdIsLoading = true
    },
    [getProductByIdAdmin.fulfilled]: (state, action) => {
      state.adminProductByIdIsLoading = false
      state.adminProductById = action.payload
    },
    [getProductByIdAdmin.rejected]: (state, action) => {
      state.adminProductByIdIsLoading = false
      state.error = action.payload
    },
    [adminDeleteProductById.pending]: (state) => {
      state.adminDeleteProductByIdIsLoading = true
    },
    [adminDeleteProductById.fulfilled]: (state, action) => {
      state.adminDeleteProductByIdIsLoading = false
    },
    [adminDeleteProductById.rejected]: (state, action) => {
      state.adminDeleteProductByIdIsLoading = false
      state.error = action.payload
    },
    [adminUpdateProduct.pending]: (state) => {
      state.adminUpdateProductIsLoading = true
    },
    [adminUpdateProduct.fulfilled]: (state, action) => {
      state.adminUpdateProductIsLoading = false
      state.adminUpdatedProduct = action.payload
    },
    [adminUpdateProduct.rejected]: (state, action) => {
      state.adminUpdateProductIsLoading = false
    },
    [adminCreateProduct.pending]: (state) => {
      state.adminCreateProductIsLoading = true
    },
    [adminCreateProduct.fulfilled]: (state, action) => {
      state.adminCreateProductIsLoading = false
      state.adminCreatedProduct = action.payload
    },
    [adminCreateProduct.rejected]: (state, action) => {
      state.adminCreateProductIsLoading = false
      state.error = action.payload
    },
  },
})

export const { setAdminCreatedProduct, setAdminUpdatedProduct } =
  productSlice.actions
export default productSlice.reducer
