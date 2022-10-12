import React from 'react'
import styles from './index.module.scss'
import startImg from '@img/icon/start/home.png'
import useStore, { MyState } from '@/store'
import WindowBar from './WindonBar'
import DateTime from './DateTime'

const StartToolsBar: React.FC = () => {
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  const closeRightMouseMenu = useStore(
    (state: MyState) => state.closeRightMouseMenu
  )
  const rightMouseMenu = useStore((state: MyState) => state.rightMouseMenu)
  const toggleShowStartMenu = useStore(
    (state: MyState) => state.toggleShowStartMenu
  )
  return (
    <div
      className={styles.startToolsBar}
      onClick={() => {
        setShowStartMenu(false)
        rightMouseMenu.show && closeRightMouseMenu()
      }}>
      <div className={styles.startTools}>
        <div
          className={styles.startIcon}
          onClick={event => {
            event.stopPropagation()
            event.preventDefault()
            rightMouseMenu.show && closeRightMouseMenu()
            toggleShowStartMenu()
          }}>
          <img className={styles.startIconImg} src={startImg} alt="startLogo" />
        </div>
        <WindowBar />
        <DateTime />
      </div>
    </div>
  )
}

export default StartToolsBar
