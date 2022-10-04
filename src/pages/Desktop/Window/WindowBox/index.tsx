import React from 'react'
import WindowContext from '../WindowContext'
import styles from './index.module.scss'
import Header from './Header'
import { WINDOW_STATUS, WINDOW_DRAG, WINDOW_MIN } from '@/common/constants'
import vars from '@/common/style/vars.scss'
import useMethods from '@utils/useMethods'
import useStore, { MyState } from '@/store'
import Content from '@/pages/Desktop/Window/WindowBox/Content'

interface Props {
  children: React.ReactNode
}

interface Drag {
  startX: number
  startY: number
  type: number
}

const WindowBox: React.FC<Props> = props => {
  const { window: windowObj } = React.useContext(WindowContext)
  const editWindow = useStore((state: MyState) => state.editWindow)
  const windowRef = React.useRef<HTMLDivElement>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [drag, setDrag] = React.useState<Drag>({
    startX: 0,
    startY: 0,
    type: 0
  })
  const { mouseMove, mouseDown, mouseUp } = useMethods({
    mouseMove(event: MouseEvent) {
      event.stopPropagation()
      event.preventDefault()
      if (!windowRef.current) {
        return
      }
      if (
        drag.type === WINDOW_DRAG.RIGHT ||
        drag.type === WINDOW_DRAG.RIGHT_BOTTOM
      ) {
        const moveX = event.clientX - drag.startX
        let newWidth = (windowObj.style.width as number) + moveX
        if (newWidth < WINDOW_MIN) {
          newWidth = WINDOW_MIN
        }
        if (newWidth + windowObj.style.left > document.body.clientWidth) {
          newWidth = document.body.clientWidth - windowObj.style.left
        }
        windowRef.current.style.width = `${newWidth}px`
      }
      if (
        drag.type === WINDOW_DRAG.BOTTOM ||
        drag.type === WINDOW_DRAG.RIGHT_BOTTOM
      ) {
        const moveY = event.clientY - drag.startY
        let newHeight = (windowObj.style.height as number) + moveY
        if (newHeight < WINDOW_MIN) {
          newHeight = WINDOW_MIN
        }
        if (
          newHeight + windowObj.style.top >
          document.body.clientHeight - parseInt(vars.startToolsBarHeight)
        ) {
          newHeight =
            document.body.clientHeight -
            windowObj.style.top -
            parseInt(vars.startToolsBarHeight)
        }
        windowRef.current.style.height = `${newHeight}px`
      }
    },
    mouseDown(event, type) {
      event.stopPropagation()
      event.preventDefault()
      const rect = event.currentTarget.getBoundingClientRect()
      const startX = rect.right
      const startY = rect.bottom
      setDrag({
        startX,
        startY,
        type
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
      if (
        drag.type === WINDOW_DRAG.RIGHT ||
        drag.type === WINDOW_DRAG.RIGHT_BOTTOM
      ) {
        windowObj.style.width = parseInt(windowRef.current.style.width)
      }
      if (
        drag.type === WINDOW_DRAG.BOTTOM ||
        drag.type === WINDOW_DRAG.RIGHT_BOTTOM
      ) {
        windowObj.style.height = parseInt(windowRef.current.style.height)
      }
      setDrag({
        startX: 0,
        startY: 0,
        type: 0
      })
      editWindow(windowObj)
    }
  })
  const windowStyle = React.useMemo(() => {
    const cssStyle = { ...windowObj.style }
    if (windowObj.status === WINDOW_STATUS.MAX) {
      cssStyle.left = 0
      cssStyle.top = 0
      cssStyle.width = '100%'
      cssStyle.height = `calc(100% - ${vars.startToolsBarHeight})`
    }
    if (windowObj.status === WINDOW_STATUS.MIN) {
      cssStyle.display = 'none'
    }
    return cssStyle
  }, [windowObj.style, windowObj.status])
  return (
    <div className={styles.windowBox} ref={windowRef} style={windowStyle}>
      <div className={styles.main} style={{ zIndex: windowStyle.zIndex + 1 }}>
        <Header setLoading={setLoading} windowRef={windowRef} />
        {/* eslint-disable-next-line react/no-children-prop */}
        <Content loading={loading} children={props.children} />
        {windowObj.status === WINDOW_STATUS.NORMAL && (
          <>
            <div
              className={styles.dragRight}
              style={{ zIndex: windowStyle.zIndex + 3 }}
              onMouseDown={event => mouseDown(event, WINDOW_DRAG.RIGHT)}
            />
            <div
              className={styles.dragBottom}
              style={{ zIndex: windowStyle.zIndex + 3 }}
              onMouseDown={event => mouseDown(event, WINDOW_DRAG.BOTTOM)}
            />
            <div
              className={styles.dragRightBottom}
              style={{ zIndex: windowStyle.zIndex + 3 }}
              onMouseDown={event => mouseDown(event, WINDOW_DRAG.RIGHT_BOTTOM)}
            />
            {drag.type > 0 && (
              <div
                className={styles.mask}
                style={{ zIndex: windowStyle.zIndex + 2 }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default WindowBox
