import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  isLoading: false,
  error: null,
}

export const getUser = createAsyncThunk('user/getUser', async () => {
  const { data } = await axios.get('http://localhost:5000/api/users/profile')
  return data
})
