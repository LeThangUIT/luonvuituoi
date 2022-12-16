import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserInfoByAdmin } from '../UserSlice'

const UserDetailPage = () => {
  const dispatch = useDispatch()
  const {userId} = useParams()
  const adminToken = localStorage.getItem("adminToken")
  const {userInfo} = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(fetchUserInfoByAdmin({userId, adminToken}))
  }, [])
  console.log(userInfo)
  return (
    <div>UserDetail</div>
  )
}

export default UserDetailPage