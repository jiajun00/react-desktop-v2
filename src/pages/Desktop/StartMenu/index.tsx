import React from 'react'
import styles from './index.module.scss'
import Control from './Control'
import Application from './Application'

const StartMenu: React.FC = () => {
  return (
    <div className={styles.startMenuBox}>
      <Control />
      <Application />
    </div>
  )
}

export default StartMenu
