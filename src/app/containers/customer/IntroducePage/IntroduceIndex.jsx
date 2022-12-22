import React from 'react'
import { Routes, Route } from 'react-router-dom'
import InsurancePage from './pages/InsurancePage'
import IntroducePage from './pages/IntroducePage'
import IntroPage from './pages/IntroPage'
import PolicyPage from './pages/PolicyPage'
import RefundPage from './pages/RefundPage'


const IntroduceIndex = () => {
    return (
      <div>
          <Routes>
                <Route path='/' element={<IntroducePage />} >
                    <Route index element={<IntroPage />} />
                    <Route path='intro' element={<IntroPage />} />
                    <Route path="policy" element={<PolicyPage />} />
                    <Route path="insurance" element={<InsurancePage />} />
                    <Route path="refund" element={<RefundPage />} />

                </Route>
          </Routes>
      </div>
    )
  }
  
  export default IntroduceIndex