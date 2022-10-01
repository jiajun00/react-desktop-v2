import React from 'react'
import WindowContext from '../WindowContext'
import styles from './index.module.scss'
import Header from './Header'
import { WINDOW_STATUS } from '@/common/constants'
import vars from '@/common/style/vars.scss'

interface Props {
  children: React.ReactNode
}

const WindowBox: React.FC<Props> = props => {
  const { window } = React.useContext(WindowContext)
  const windowStyle = React.useMemo(() => {
    const cssStyle = { ...window.style }
    if (window.status === WINDOW_STATUS.MAX) {
      cssStyle.left = 0
      cssStyle.top = 0
      cssStyle.width = '100%'
      cssStyle.height = `calc(100% - ${vars.startToolsBarHeight})`
    }
    if (window.status === WINDOW_STATUS.MIN) {
      cssStyle.display = 'none'
    }
    return cssStyle
  }, [window.style, window.status])
  return (
    <div className={styles.windowBox} style={windowStyle}>
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{props.children}</div>
        <div className={styles.dragRight} />
        <div className={styles.dragBottom} />
        <div className={styles.dragRightBottom} />
      </div>
    </div>
  )
}

export default WindowBox
