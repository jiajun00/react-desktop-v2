import React from 'react'
import styles from './index.module.scss'
import useStore, { MyState } from '@/store'

const Mask: React.FC = () => {
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  const rightMouseMenu = useStore((state: MyState) => state.rightMouseMenu)
  const closeRightMouseMenu = useStore(
    (state: MyState) => state.closeRightMouseMenu
  )
  const openRightMouseMenu = useStore(
    (state: MyState) => state.openRightMouseMenu
  )
  const showStartMenu = useStore((state: MyState) => state.showStartMenu)
  return (
    <div
      className={styles.mask}
      onContextMenu={event => {
        event.stopPropagation()
        event.preventDefault()
        showStartMenu && setShowStartMenu(false)
        openRightMouseMenu(event)
      }}
      style={{
        display: showStartMenu || rightMouseMenu.show ? 'block' : 'none'
      }}
      onClick={() => {
        showStartMenu && setShowStartMenu(false)
        rightMouseMenu.show && closeRightMouseMenu()
      }}
    />
  )
}

export default Mask
