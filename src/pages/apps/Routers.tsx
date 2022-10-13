import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Management from './management'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/manage/*" element={<Management />} />
    </Routes>
  )
}

export default Routers
