import React from 'react'
import useStore, { MyState } from '@/store'
import Desk from './Desk'
import StartToolsBar from './StartToolsBar'
import styles from './index.module.scss'
import StartMenu from './StartMenu'
import Mask from './Mask'

const Desktop: React.FC = () => {
  const showStartMenu = useStore((state: MyState) => state.showStartMenu)
  return (
    <div className={styles.desktopFramework}>
      <Desk />
      <StartToolsBar />
      {showStartMenu && <StartMenu />}
      {showStartMenu && <Mask />}
    </div>
  )
}

export default Desktop
