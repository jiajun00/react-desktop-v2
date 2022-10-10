import React from 'react'
import useStore, { MyState } from '@/store'
import Desk from './Desk'
import StartToolsBar from './StartToolsBar'
import styles from './index.module.scss'
import StartMenu from './StartMenu'
import Mask from './Mask'
import Window from './Window'
import RightMouseMenu from './RightMouseMenu'

const Desktop: React.FC = () => {
  const showStartMenu = useStore((state: MyState) => state.showStartMenu)
  const windowList = useStore((state: MyState) => state.windowList)
  return (
    <div className={styles.desktopFramework}>
      <Desk />
      {windowList.map((window, index) => (
        <Window key={window.id} window={window} index={index} />
      ))}
      <StartToolsBar />
      {showStartMenu && <StartMenu />}
      {showStartMenu && <Mask />}
      <RightMouseMenu />
    </div>
  )
}

export default Desktop
