import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoardPage from './pages/DashBoardPage'


function DashBoardIndex() {
  return (
        <Routes>
            <Route index element={<DashBoardPage/>} ></Route>
        </Routes>
  )
}

export default DashBoardIndex