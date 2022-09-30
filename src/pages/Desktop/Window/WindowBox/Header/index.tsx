import React from 'react'
import { MinusOutlined, CloseOutlined, BorderOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import styles from './index.module.scss'
import WindowContext from '@/pages/Desktop/Window/WindowContext'

const Header: React.FC = () => {
  const { window } = React.useContext(WindowContext)
  return (
    <div className={styles.headerBox}>
      <div className={styles.title}>{window.title}</div>
      <div className={styles.tools}>
        <div className={styles.tool}>
          <MinusOutlined />
        </div>
        <div className={classnames(styles.tool, styles.full)}>
          <BorderOutlined />
        </div>
        <div className={classnames(styles.tool, styles.close)}>
          <CloseOutlined />
        </div>
      </div>
    </div>
  )
}

export default Header
