import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

const LoginIndex = () => {
    return (
      <div>
          <Routes>
              <Route index element={<LoginPage/>} />
          </Routes>
      </div>
    )
  }
  
  export default LoginIndex
