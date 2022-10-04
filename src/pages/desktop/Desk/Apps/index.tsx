import React from 'react'
import styles from './index.module.scss'
import ImageComponent from '@/components/ImageComponent'
import useStore, { MyState } from '@/store'

const Apps: React.FC = () => {
  const appList = useStore((state: MyState) => state.appList)
  const openWindow = useStore((state: MyState) => state.openWindow)
  return (
    <div className={styles.apps}>
      {appList.map(app => (
        <div
          key={app.id}
          className={styles.appBox}
          onClick={() => openWindow(app)}>
          <div className={styles.appImg}>
            <ImageComponent image={app.image} />
          </div>
          <div className={styles.appTitle}>{app.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Apps
