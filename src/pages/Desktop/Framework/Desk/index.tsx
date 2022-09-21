import React from "react"
import styles from './index.module.scss'
import backgroundImg from '@img/wallpaper/dark/img0.jpg';

interface Props {
  children: React.ReactNode
}

const Desk: React.FC<Props> = (props) => {
  const {children} = props
  return (
    <div
      className={styles.desk}
      style={{backgroundImage: `url(${backgroundImg})`}}
    >
      {children}
    </div>
  )
}

export default Desk