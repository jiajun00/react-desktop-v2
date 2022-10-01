import React from 'react'
import styles from './index.module.scss'
import startImg from '@img/icon/start/home.png'
import useStore, { MyState } from '@/store'
import WindowBar from './WindonBar'
import DateTime from '@/pages/Desktop/StartToolsBar/DateTime'

const StartToolsBar: React.FC = () => {
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  const toggleShowStartMenu = useStore(
    (state: MyState) => state.toggleShowStartMenu
  )
  return (
    <div
      className={styles.startToolsBar}
      onClick={() => setShowStartMenu(false)}>
      <div className={styles.startTools}>
        <div
          className={styles.startIcon}
          onClick={event => {
            event.stopPropagation()
            event.preventDefault()
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
