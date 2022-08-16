import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  topProductsRes: [],
  topProductsResIsLoading: false,
  latestProductsRes: [],
  latestProductsResIsLoading: false,
  allProductsAdmin: [],
  adminDeleteProductByIdIsLoading: false,
  adminCreateProduct: {},
  adminCreatedProduct: {},
  page: 1,
  pages: 1,
  adminCreateProductIsLoading: false,
  addReviewResIsLoading: false,
  addReviewRes: {},
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
  async ({ keyword, page }) => {
    const pageNum = page || ''
    const userKeyword = keyword || ''
    const { data } = await axios.get(
      `http://localhost:5000/api/products?keyword=${userKeyword}&page=${pageNum}`
    )
    return data
  }
)

export const getTopProducts = createAsyncThunk(
  'products/getTopProducts',
  async () => {
    const { data } = await axios.get('http://localhost:5000/api/products/top')
    return data
  }
)

export const getLatestProducts = createAsyncThunk(
  'products/getLatestProducts',
  async () => {
    const { data } = await axios.get(
      'http://localhost:5000/api/products/latest'
    )
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

export const addReview = createAsyncThunk(
  'user/addReview',
  async ({ id, comment, rating }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    await axios.post(
      `http://localhost:5000/api/products/${id}/review`,
      { comment, rating },
      config
    )
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
      state.products = action.payload.products
      state.page = action.payload.page
      state.pages = action.payload.pages
    },
    [getAllProducts.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getTopProducts.pending]: (state) => {
      state.topProductsResIsLoading = true
    },
    [getTopProducts.fulfilled]: (state, action) => {
      state.topProductsResIsLoading = false
      state.topProductsRes = action.payload
    },
    [getTopProducts.rejected]: (state, action) => {
      state.topProductsResIsLoading = false
      state.error = action.payload
    },
    [getLatestProducts.pending]: (state) => {
      state.latestProductsResIsLoading = true
    },
    [getLatestProducts.fulfilled]: (state, action) => {
      state.latestProductsResIsLoading = false
      state.latestProductsRes = action.payload.latestProducts
    },
    [getLatestProducts.rejected]: (state, action) => {
      state.latestProductsResIsLoading = false
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
    [addReview.pending]: (state) => {
      state.addReviewResIsLoading = true
    },
    [addReview.fulfilled]: (state, action) => {
      state.addReviewResIsLoading = false
      state.addReviewRes = action.payload
    },
    [addReview.rejected]: (state, action) => {
      state.addReviewResIsLoading = false
      state.error = action.payload
    },
  },
})

export const { setAdminCreatedProduct, setAdminUpdatedProduct } =
  productSlice.actions
export default productSlice.reducer
