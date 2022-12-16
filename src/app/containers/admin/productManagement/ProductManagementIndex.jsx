import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductManagementPage from './pages/ProductManagementPage'

function ProductManagementIndex() {
  return (
        <Routes>
            <Route index element={<ProductManagementPage/>} ></Route>
            <Route path='/:productId' element={<ProductDetailPage/>} ></Route>
        </Routes>
  )
}

export default ProductManagementIndex