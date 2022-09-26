import React from 'react'
import styles from './index.module.scss'
import backgroundImg from '@img/wallpaper/dark/img0.jpg'

interface Props {}

const Desk: React.FC<Props> = props => {
  return (
    <div
      className={styles.desk}
      style={{ backgroundImage: `url(${backgroundImg})` }}>
      abased
    </div>
  )
}

export default Desk
