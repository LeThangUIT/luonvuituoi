import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDetailPage from './pages/UserDetailPage'
import UserManagementPage from './pages/UserManagementPage'



function UserManagementIndex() {
  return (
        <Routes>
            <Route index element={<UserManagementPage/>} ></Route>
            <Route path='/:userId' element={<UserDetailPage/>} ></Route>
        </Routes>
  )
}

export default UserManagementIndex