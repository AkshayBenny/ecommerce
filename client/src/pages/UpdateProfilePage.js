import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/user/userSlice'

const UpdateProfilePage = () => {
  const dispatch = useDispatch()
  const { isLoading, error, user } = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ email, password, name }))
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='Enter new name'
        onChange={(e) => setName(e.target.value)}
        value={user.name ? user.name : name}
      />
      <input
        type='email'
        placeholder='Enter new email'
        onChange={(e) => setEmail(e.target.value)}
        value={user.email ? user.email : email}
      />
      <input
        type='password'
        placeholder='Enter new password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type='submit'>Update</button>
    </form>
  )
}

export default UpdateProfilePage
