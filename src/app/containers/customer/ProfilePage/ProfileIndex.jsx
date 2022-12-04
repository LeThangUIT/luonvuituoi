import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Info from './pages/Info'
import OrdersList from './pages/OrdersList'
import ProfilePage from './pages/ProfilePage'
import VouchersList from './pages/VouchersList'

function ProfileIndex() {
    return (
          <Routes>
              <Route path='/' element={<ProfilePage/>} >
                <Route index element={<Info />} />
                <Route path='info' element={<Info />} />
                <Route path="orders" element={<OrdersList />} />
                <Route path="vouchers" element={<VouchersList />} />
              </Route>
          </Routes>
    )
}

export default ProfileIndex