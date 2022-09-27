import React from 'react'
import styles from './index.module.scss'
import startImg from '@img/icon/start/home.png'

interface Props {}

const StartToolsBar: React.FC<Props> = props => {
  return (
    <div className={styles.startToolsBar}>
      <div className={styles.startTools}>
        <div className={styles.startIcon}>
          <img className={styles.startIconImg} src={startImg} alt="startLogo" />
        </div>
      </div>
    </div>
  )
}

export default StartToolsBar
