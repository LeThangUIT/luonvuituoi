import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VoucherPage from './pages/VoucherPage'

export default function VoucherIndex() {
    return (
        <div>
            <Routes>
                <Route index element={<VoucherPage />} />
            </Routes>
        </div>
    )
}