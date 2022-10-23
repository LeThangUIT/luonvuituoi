import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BrandManagementPage from './pages/BrandManagementPage'


function BrandManagementIndex() {
  return (
        <Routes>
            <Route index element={<BrandManagementPage/>} ></Route>
        </Routes>
  )
}

export default BrandManagementIndex