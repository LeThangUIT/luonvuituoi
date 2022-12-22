import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'

const ProductIndex = () => {
    return (
      <div>
          <Routes>
              <Route index element={<ProductPage/>} />
              <Route path="/:categoryId" element={<ProductPage/>} />
          </Routes>
      </div>
    )
  }
  
  export default ProductIndex


