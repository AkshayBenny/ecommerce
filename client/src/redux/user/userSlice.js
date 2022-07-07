import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  getUserById: {},
  getUserByIdIsLoading: false,
  editUser: {},
  editUserIsLoading: false,
  userList: [],
  userListIsLoading: false,
  deleteUser: {},
  deleteUserIsLoading: false,
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

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users/register',
      { email, password, name },
      config
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, password, name }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      'http://localhost:5000/api/users/profile/update',
      { email, password, name },
      config
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  }
)

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const token = userInfo.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(
    'http://localhost:5000/api/admin/users',

    config
  )

  return data
})

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      `http://localhost:5000/api/admin/users/${id}`,

      config
    )

    return data
  }
)

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ id, name, email, isAdmin }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/admin/users/${id}`,
      { name, email, isAdmin },

      config
    )

    return data
  }
)

export const getUserById = createAsyncThunk(
  'user/getUserById',
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
      `http://localhost:5000/api/admin/users/${id}`,

      config
    )

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
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getAllUsers.pending]: (state) => {
      state.userListIsLoading = true
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userListIsLoading = false
      state.userList = action.payload
    },
    [getAllUsers.rejected]: (state, action) => {
      state.userListIsLoading = false
      state.error = action.payload
    },
    [deleteUser.pending]: (state) => {
      state.deleteUserIsLoading = true
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.deleteUserIsLoading = false
      state.deleteUser = action.payload
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteUserIsLoading = false
      state.error = action.payload
    },
    [editUser.pending]: (state) => {
      state.editUserIsLoading = true
    },
    [editUser.fulfilled]: (state, action) => {
      state.editUserIsLoading = false
      state.editUser = action.payload
    },
    [editUser.rejected]: (state, action) => {
      state.editUserIsLoading = false
      state.error = action.payload
    },
    [getUserById.pending]: (state) => {
      state.getUserByIdIsLoading = true
    },
    [getUserById.fulfilled]: (state, action) => {
      state.getUserByIdIsLoading = false
      state.getUserById = action.payload
    },
    [getUserById.rejected]: (state, action) => {
      state.getUserByIdIsLoading = false
      state.error = action.payload
    },
  },
})
export const { setUserFromLocalStorage, logOut } = userSlice.actions

export default userSlice.reducer
