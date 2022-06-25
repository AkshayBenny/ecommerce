import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  isLoading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromLocalStorage: (state, action) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = {}
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
export const { setUserFromLocalStorage,logOut } = userSlice.actions

export default userSlice.reducer
