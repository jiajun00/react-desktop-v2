import React from 'react'
import styles from './index.module.scss'
import ImageComponent from '@/components/ImageComponent'
import useStore, { MyState } from '@/store'

const Apps: React.FC = () => {
  const windowList = useStore((state: MyState) => state.windowList)
  return (
    <div className={styles.apps}>
      {windowList.map(window => (
        <div key={window.id} className={styles.appBox}>
          <div className={styles.appImg}>
            <ImageComponent image={window.image} />
          </div>
          <div className={styles.appTitle}>{window.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Apps
