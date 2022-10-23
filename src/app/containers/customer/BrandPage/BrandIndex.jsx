import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BrandDetailPage from './pages/BrandDetailPage'
import BrandPage from './pages/BrandPage'

const BrandIndex = () => {
    return (
      <div>
          <Routes>
              <Route index element={<BrandPage/>} />
              <Route path="/*" element={<BrandDetailPage/>} />
          </Routes>
      </div>
    )
  }
  
  export default BrandIndex


