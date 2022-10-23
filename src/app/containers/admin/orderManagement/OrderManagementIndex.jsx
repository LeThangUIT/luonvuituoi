import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderManagementPage from './pages/OrderManagementPage'


function OrderManagementIndex() {
  return (
        <Routes>
            <Route index element={<OrderManagementPage/>} ></Route>
        </Routes>
  )
}

export default OrderManagementIndex