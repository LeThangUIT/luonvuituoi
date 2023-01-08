import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VoucherManagementPage from './pages/VoucherManagementPage'



function VoucherManagementIndex() {
  return (
        <Routes>
            <Route index element={<VoucherManagementPage/>} ></Route>
        </Routes>
  )
}

export default VoucherManagementIndex