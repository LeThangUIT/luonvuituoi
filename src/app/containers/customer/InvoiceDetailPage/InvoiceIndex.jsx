import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InvoicePage from './pages/InvoicePage'


export default function InvoiceIndex() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<InvoicePage />} />
            </Routes>
        </div>
    )
}
