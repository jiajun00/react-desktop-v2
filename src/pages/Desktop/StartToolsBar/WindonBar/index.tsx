import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './index.module.scss'
import classNames from 'classnames'
import logoImg from '@img/icon/start/home.png'
import useStore, { MyState } from '@/store'

const WindowBar: React.FC = () => {
  const windowList = useStore((state: MyState) => state.windowList)
  const windowActionId = useStore((state: MyState) => state.windowActionId)
  const closeWindow = useStore((state: MyState) => state.closeWindow)
  return (
    <div className={styles.windowBarBox}>
      {windowList.map(window => (
        <div
          key={window.id}
          className={classNames(styles.windowBox, {
            [styles.active]: window.id === windowActionId
          })}>
          <div className={styles.windowImg}>
            <img src={logoImg} alt="logo" />
          </div>
          <div className={styles.windowTitle}>{window.title}</div>
          <div className={styles.close} onClick={() => closeWindow(window.id)}>
            <CloseCircleFilled />
          </div>
        </div>
      ))}
    </div>
  )
}

export default WindowBar
