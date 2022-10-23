import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'

const RegisterIndex = () => {
    return (
      <div>
          <Routes>
              <Route index element={<RegisterPage/>} />
          </Routes>
      </div>
    )
  }
export default RegisterIndex
