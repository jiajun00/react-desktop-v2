import React from 'react'
import styles from './index.module.scss'
import Control from './Control'
import Application from './Application'

const StartMenu: React.FC = () => {
  return (
    <div
      onContextMenu={event => {
        event.stopPropagation()
        event.preventDefault()
      }}
      className={styles.startMenuBox}>
      <Control />
      <Application />
    </div>
  )
}

export default StartMenu
