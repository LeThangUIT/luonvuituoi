import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'

function ProfileIndex() {
    return (
      <div>
          <Routes>
              <Route index element={<ProfilePage/>} />
          </Routes>
      </div>
    )
}

export default ProfileIndex