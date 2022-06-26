import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../redux/user/userSlice'

const SignInPage = () => {
  const { isLoading, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 
  

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Something went wrong...</div>

  return (
    <form onSubmit={submitHandler}>
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
      <button type='submit'>Sign In</button>
      <div className='flex'>
        <p>New user? </p>{' '}
        <Link to='/register'>
          <p className='cursor-pointer hover:underline'>Register</p>
        </Link>
      </div>
    </form>
  )
}

export default SignInPage
