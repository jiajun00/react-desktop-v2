import React from 'react'
import styles from './index.module.scss'
import backgroundImg from '@img/wallpaper/dark/img0.jpg'
import Apps from './Apps'

interface Props {}

const Desk: React.FC<Props> = props => {
  return (
    <div
      className={styles.desk}
      style={{ backgroundImage: `url(${backgroundImg})` }}>
      <Apps />
    </div>
  )
}

export default Desk
