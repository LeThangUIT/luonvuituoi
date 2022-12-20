import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Info from './pages/Info'
import InvoicesList from './pages/InvoicesList'

import ProfilePage from './pages/ProfilePage'
import VouchersList from './pages/VouchersList'

function ProfileIndex() {
    return (
          <Routes>
              <Route path='/' element={<ProfilePage/>} >
                <Route index element={<Info />} />
                <Route path='info' element={<Info />} />
                <Route path="invoices" element={<InvoicesList />} />
                <Route path="vouchers" element={<VouchersList />} />
              </Route>
          </Routes>
    )
}

export default ProfileIndex