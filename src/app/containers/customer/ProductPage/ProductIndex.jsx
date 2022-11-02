import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import ProductPageByCategory from './pages/ProductPageByCategory'

const ProductIndex = () => {
    return (
      <div>
          <Routes>
              <Route index element={<ProductPage/>} />
              <Route path="/*" element={<ProductPageByCategory/>} />
          </Routes>
      </div>
    )
  }
  
  export default ProductIndex


