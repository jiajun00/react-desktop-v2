import React from 'react'
import styles from './index.module.scss'
import useStore, { MyState } from '@/store'

const Mask: React.FC = () => {
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  return (
    <div
      className={styles.mask}
      onClick={() => {
        setShowStartMenu(false)
      }}
    />
  )
}

export default Mask
