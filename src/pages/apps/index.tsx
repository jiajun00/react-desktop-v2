import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Management from './management'

const Apps: React.FC = () => {
  return (
    <Routes>
      asd
      <Route path="/manage/*" element={<Management />} />
    </Routes>
  )
}

export default Apps
