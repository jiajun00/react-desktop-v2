import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Userinfo from './user/userinfo'
import Privileges from './system/privileges'
import Role from './system/role'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/userinfo" element={<Userinfo />} />
      <Route path="/privileges" element={<Privileges />} />
      <Route path="/role" element={<Role />} />
    </Routes>
  )
}

export default Routers
