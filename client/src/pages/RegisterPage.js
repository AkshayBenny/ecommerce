import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/user/userSlice'

const RegisterPage = () => {
  const { isLoading, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Something went wrong...</div>

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type='email'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type='submit'>Register</button>
    </form>
  )
}

export default RegisterPage
