import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteUser, getUserById, editUser } from '../../redux/user/userSlice'

const UserPage = () => {
  const { id } = useParams()
  const { getUserById: userData, getUserByIdIsLoading } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserById({ id }))
    } else {
      navigate('/login')
    }
  }, [dispatch])

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login')
    }
  }, [userInfo])

  useEffect(() => {
    if (!getUserByIdIsLoading && userData.user) {
      setFname(userData.user.fname)
      setLname(userData.user.lname)
      setPhone(userData.user.phone)
      setEmail(userData.user.email)
      setIsAdmin(userData.user.isAdmin)
    }
  }, [userData, getUserByIdIsLoading])
  const deleteUserHandler = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser({ id }))
      navigate('/admin/users')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(editUser({ id, fname, lname, phone, email, isAdmin }))
  }

  if (getUserByIdIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>
        {userData?.user?.fname} {userData?.user?.lname}
      </h1>
      <p>{userData?.user?.email}</p>
      <p>{userData?.user?.phone}</p>
      <p>User id : {userData?.user?._id}</p>
      <p>Admin:{userData?.user?.isAdmin ? 'True' : 'False'}</p>
      <button onClick={deleteUserHandler} className='bg-black text-white p-2'>
        Delete user
      </button>

      <hr />

      <form onSubmit={submitHandler} className='space-y-3 pt-4'>
        <div>
          <label htmlFor='name'>First Name</label>
          <input
            className='border p-2'
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            type='text'
            id='name'
          />
        </div>
        <div>
          <label htmlFor='name'>First Name</label>
          <input
            className='border p-2'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            type='text'
            id='name'
          />
        </div>
        <div>
          <label htmlFor='phone'>First Name</label>
          <input
            className='border p-2'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='text'
            id='name'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            className='border p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            id='email'
          />
        </div>
        <div>
          <label htmlFor='isAdmin'>Admin user:</label>
          <div className='flex flex-col'>
            <div className='flex'>
              <p>True:</p>
              <input
                type='checkbox'
                name='isAdmin'
                value={isAdmin}
                checked={isAdmin}
                onChange={() => setIsAdmin(true)}
              />
            </div>
            <div className='flex'>
              <p>False:</p>
              <input
                type='checkbox'
                name='isAdmin'
                value={!isAdmin}
                checked={!isAdmin}
                onChange={() => setIsAdmin(false)}
              />
            </div>
          </div>
        </div>
        <button type='submit' className='bg-black text-white p-2'>
          Update user
        </button>
      </form>
    </div>
  )
}

export default UserPage
