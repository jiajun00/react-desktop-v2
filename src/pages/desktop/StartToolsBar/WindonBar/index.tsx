import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './index.module.scss'
import classNames from 'classnames'
import useStore, { MyState } from '@/store'
import ImageComponent from '@/components/ImageComponent'
import { WINDOW_STATUS } from '@/common/constants'

const WindowBar: React.FC = () => {
  const windowList = useStore((state: MyState) => state.windowList)
  const windowActionId = useStore((state: MyState) => state.windowActionId)
  const setWindowActionId = useStore(
    (state: MyState) => state.setWindowActionId
  )
  const closeWindow = useStore((state: MyState) => state.closeWindow)
  const setWindowStatus = useStore((state: MyState) => state.setWindowStatus)
  return (
    <div
      className={styles.windowBarBox}
      onContextMenu={event => {
        event.stopPropagation()
        event.preventDefault()
      }}>
      {windowList.map(window => (
        <div
          key={window.id}
          className={classNames(styles.windowBox, {
            [styles.active]: window.id === windowActionId
          })}
          onClick={() => {
            if (window.id === windowActionId) {
              setWindowStatus(WINDOW_STATUS.MIN, window.id)
            } else {
              setWindowActionId(window.id, true)
            }
          }}>
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
