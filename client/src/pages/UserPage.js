import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteUser, getUserById, editUser } from '../redux/user/userSlice'

const UserPage = () => {
  const { id } = useParams()
  const { getUserById: userData, getUserByIdIsLoading } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const deleteUserHandler = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser({ id }))
      navigate('/admin/users')
    }
  }

  if (getUserByIdIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{userData?.name}</h1>
      <p>{userData?.email}</p>
      <p>User id : {userData?._id}</p>
      <p>Admin:{userData?.isAdmin ? 'True' : 'False'}</p>
      <button onClick={deleteUserHandler} className='bg-black text-white p-2'>
        Delete user
      </button>
    </div>
  )
}

export default UserPage
