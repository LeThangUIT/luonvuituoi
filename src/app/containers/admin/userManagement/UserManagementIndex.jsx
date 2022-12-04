import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserManagementPage from './pages/UserManagementPage'



function UserManagementIndex() {
  return (
        <Routes>
            <Route index element={<UserManagementPage/>} ></Route>
        </Routes>
  )
}

export default UserManagementIndex