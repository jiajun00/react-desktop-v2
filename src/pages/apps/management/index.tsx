import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Userinfo from './user/userinfo'

const Management: React.FC = () => {
  return (
    <Routes>
      <Route path="/userinfo" element={<Userinfo />} />
    </Routes>
  )
}

export default Management
