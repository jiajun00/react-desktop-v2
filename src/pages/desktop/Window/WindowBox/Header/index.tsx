import React, { RefObject } from 'react'
import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  BlockOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import classnames from 'classnames'
import styles from './index.module.scss'
import WindowContext from '../../WindowContext'
import useStore, { MyState } from '@/store'
import { WINDOW_STATUS, WINDOW_MIN, WINDOW_DRAG } from '@/common/constants'
import useMethods from '@utils/useMethods'
import vars from '@/common/style/vars.scss'
import { Drag } from '../index'

interface Props {
  windowRef: RefObject<HTMLDivElement>
  setLoading: { (value: boolean): void }
  drag: Drag
  setDrag: { (value: Drag): void }
}

const Header: React.FC<Props> = ({ windowRef, setLoading, drag, setDrag }) => {
  const { window: windowObj, id: windowId } = React.useContext(WindowContext)
  const editWindow = useStore((state: MyState) => state.editWindow)
  const editWindowStatus = useStore((state: MyState) => state.setWindowStatus)
  const closeWindow = useStore((state: MyState) => state.closeWindow)
  const { mouseDown, mouseMove, mouseUp } = useMethods({
    mouseMove(event) {
      event.stopPropagation()
      event.preventDefault()
      if (!windowRef.current) {
        return
      }
      const moveX = event.clientX - drag.startX
      let newX = windowObj.style.left + moveX
      if (newX <= 0) {
        newX = 0
      }
      const xMax = document.body.clientWidth - WINDOW_MIN
      if (newX > xMax) {
        newX = xMax
      }
      windowRef.current.style.left = `${newX}px`
      const moveY = event.clientY - drag.startY
      let newY = windowObj.style.top + moveY
      if (newY <= 0) {
        newY = 0
      }
      const yMax =
        document.body.clientHeight -
        WINDOW_MIN -
        parseInt(vars.startToolsBarHeight)
      if (newY > yMax) {
        newY = yMax
      }
      windowRef.current.style.top = `${newY}px`
    },
    mouseDown(event) {
      event.stopPropagation()
      event.preventDefault()
      const startX = event.clientX
      const startY = event.clientY
      setDrag({
        startX,
        startY,
        type: WINDOW_DRAG.TITLE
      })
      window.addEventListener('mousemove', mouseMove)
      window.onmouseup = mouseUp
    },
    mouseUp(event) {
      event.stopPropagation()
      event.preventDefault()
      window.removeEventListener('mousemove', mouseMove)
      window.onmouseup = null
      if (!windowRef.current) {
        setDrag({
          startX: 0,
          startY: 0,
          type: 0
        })
        return
      }
      windowObj.style.top = parseInt(windowRef.current.style.top)
      windowObj.style.left = parseInt(windowRef.current.style.left)
      setDrag({
        startX: 0,
        startY: 0,
        type: 0
      })
      editWindow(windowObj)
    }
  })
  return (
    <div className={styles.headerBox}>
      <div className={styles.title} onMouseDown={event => mouseDown(event)}>
        {windowObj.title}
      </div>
      <div className={styles.tools}>
        <div
          className={styles.tool}
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => {
              setLoading(false)
            }, 200)
          }}>
          <ReloadOutlined />
        </div>
        <div
          className={styles.tool}
          onClick={() => editWindowStatus(WINDOW_STATUS.MIN, windowId)}>
          <MinusOutlined />
        </div>
        {windowObj.status === WINDOW_STATUS.NORMAL && (
          <div
            className={classnames(styles.tool, styles.full)}
            onClick={() => editWindowStatus(WINDOW_STATUS.MAX, windowId)}>
            <BorderOutlined />
          </div>
        )}
        {windowObj.status === WINDOW_STATUS.MAX && (
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
