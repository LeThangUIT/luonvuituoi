import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryManagementPage from './pages/CategoryManagementPage'


function CategoryManagementIndex() {
  return (
        <Routes>
            <Route index element={<CategoryManagementPage/>} ></Route>
        </Routes>
  )
}

export default CategoryManagementIndex