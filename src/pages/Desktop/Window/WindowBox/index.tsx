import React from 'react'
import WindowContext from '../WindowContext'
import styles from './index.module.scss'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const WindowBox: React.FC<Props> = props => {
  const { window } = React.useContext(WindowContext)
  return (
    <div
      className={styles.windowBox}
      style={{
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        top: window.top,
        left: window.left
      }}>
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{props.children}</div>
        <div className={styles.dragRight} />
        <div className={styles.dragBottom} />
        <div className={styles.dragRightBottom} />
      </div>
    </div>
  )
}

export default WindowBox
