import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductManagementPage from './pages/ProductManagementPage'

function ProductManagementIndex() {
  return (
        <Routes>
            <Route index element={<ProductManagementPage/>} ></Route>
        </Routes>
  )
}

export default ProductManagementIndex