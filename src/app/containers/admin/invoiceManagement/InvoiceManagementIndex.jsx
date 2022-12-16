import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InvoiceDetailPage from './pages/InvoiceDetailPage'
import InvoiceManagementPage from './pages/InvoiceManagementPage'


function InvoiceManagementIndex() {
  return (
        <Routes>
            <Route index element={<InvoiceManagementPage/>} ></Route>
            <Route path='/:invoiceId' element={<InvoiceDetailPage/>} ></Route>
        </Routes>
  )
}

export default InvoiceManagementIndex