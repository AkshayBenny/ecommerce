import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getAllProducts = createAsyncThunk(
  'cart/getAllProducts',
  async () => {
    const products = await fetch(url).then((res) =>
      res.json().catch((err) => console.log(err))
    )
    return products
  }
)

export const productSlice = createSlice({
  name: 'product',
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
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getAllProducts.rejected]: (state) => {
      state.isLoading = true
    },
  },
})

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  productSlice.actions

export default productSlice.reducer
