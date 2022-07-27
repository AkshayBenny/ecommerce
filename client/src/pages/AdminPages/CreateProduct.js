import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CreateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login')
    }
  }, [userInfo])

  return <div>CreateProduct</div>
}

export default CreateProduct
