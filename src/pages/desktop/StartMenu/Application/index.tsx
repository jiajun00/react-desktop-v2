import React from 'react'
import styles from './index.module.scss'
import startImg from '@img/icon/start/home.png'
import useStore, { MyState } from '@/store'
import ImageComponent from '@/components/ImageComponent'

const Application: React.FC = () => {
  const startMenuList = useStore((state: MyState) => state.startMenuList)
  const openWindow = useStore((state: MyState) => state.openWindow)
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  return (
    <div className={styles.applicationBox}>
      <div className={styles.applicationScroll}>
        <div className={styles.application}>
          {startMenuList.map(app => (
            <div
              key={app.id}
              className={styles.appBox}
              onClick={() => {
                openWindow(app)
                setShowStartMenu(false)
              }}>
              <div className={styles.icon}>
                <ImageComponent className={styles.iconImg} image={app.image} />
              </div>
              <div className={styles.title}>{app.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Application
