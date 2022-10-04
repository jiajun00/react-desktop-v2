import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './index.module.scss'
import classNames from 'classnames'
import useStore, { MyState } from '@/store'
import ImageComponent from '@/components/ImageComponent'

const WindowBar: React.FC = () => {
  const windowList = useStore((state: MyState) => state.windowList)
  const windowActionId = useStore((state: MyState) => state.windowActionId)
  const setWindowActionId = useStore(
    (state: MyState) => state.setWindowActionId
  )
  const closeWindow = useStore((state: MyState) => state.closeWindow)
  return (
    <div className={styles.windowBarBox}>
      {windowList.map(window => (
        <div
          key={window.id}
          className={classNames(styles.windowBox, {
            [styles.active]: window.id === windowActionId
          })}
          onClick={() => setWindowActionId(window.id, 1)}>
          <div className={styles.windowImg}>
            <ImageComponent image={window.image} />
          </div>
          <div className={styles.windowTitle}>{window.title}</div>
          <div
            className={styles.close}
            onClick={event => {
              event.stopPropagation()
              event.preventDefault()
              closeWindow(window.id)
            }}>
            <CloseCircleFilled />
          </div>
        </div>
      ))}
    </div>
  )
}

export default WindowBar
