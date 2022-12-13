import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InvoiceManagementPage from './pages/InvoiceManagementPage'


function InvoiceManagementIndex() {
  return (
        <Routes>
            <Route index element={<InvoiceManagementPage/>} ></Route>
        </Routes>
  )
}

export default InvoiceManagementIndex