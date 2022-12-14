import React from 'react'
import { Spin } from 'antd'
import styles from './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import getToken from '@utils/getToken'
import Desktop from './pages/desktop'
import Apps from './pages/apps'
import Login from './pages/login'

function App() {
  const [isLoad, setIsLoad] = React.useState<boolean>(false)
  React.useEffect(() => {
    getToken(() => {
      setIsLoad(true)
    })
  }, [])
  return (
    <div className={styles.app}>
      {isLoad ? (
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/apps/*" element={<Apps />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Spin size="large" />
      )}
    </div>
  )
}

export default App
