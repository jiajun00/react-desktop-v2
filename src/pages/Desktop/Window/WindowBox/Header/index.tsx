import React from 'react'
import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  BlockOutlined
} from '@ant-design/icons'
import classnames from 'classnames'
import styles from './index.module.scss'
import WindowContext from '@/pages/Desktop/Window/WindowContext'
import useStore, { MyState } from '@/store'
import { WINDOW_STATUS } from '@/common/constants'

const Header: React.FC = () => {
  const { window, id: windowId } = React.useContext(WindowContext)
  const editWindowStatus = useStore((state: MyState) => state.setWindowStatus)
  const closeWindow = useStore((state: MyState) => state.closeWindow)
  return (
    <div className={styles.headerBox}>
      <div className={styles.title}>{window.title}</div>
      <div className={styles.tools}>
        <div
          className={styles.tool}
          onClick={() => editWindowStatus(WINDOW_STATUS.MIN, windowId)}>
          <MinusOutlined />
        </div>
        {window.status === WINDOW_STATUS.NORMAL && (
          <div
            className={classnames(styles.tool, styles.full)}
            onClick={() => editWindowStatus(WINDOW_STATUS.MAX, windowId)}>
            <BorderOutlined />
          </div>
        )}
        {window.status === WINDOW_STATUS.MAX && (
          <div
            className={classnames(styles.tool, styles.normal)}
            onClick={() => editWindowStatus(WINDOW_STATUS.NORMAL, windowId)}>
            <BlockOutlined />
          </div>
        )}
        <div
          className={classnames(styles.tool, styles.close)}
          onClick={() => closeWindow(windowId)}>
          <CloseOutlined />
        </div>
      </div>
    </div>
  )
}

export default Header
