import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'

function CheckoutIndex() {
  return (
    <Routes>
            <Route index element={<CheckoutPage />} />
    </Routes>
  )
}

export default CheckoutIndex