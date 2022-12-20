import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'
import ThankPage from './pages/ThankPage'

function CheckoutIndex() {
  return (
    <Routes>
            <Route index element={<CheckoutPage />} />
            <Route path='thank' element={<ThankPage/>} />
    </Routes>
  )
}

export default CheckoutIndex