import React from 'react'
import {
  MenuOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import styles from './index.module.scss'

interface Props {}

const Control: React.FC<Props> = props => {
  return (
    <div className={styles.control}>
      <div className={styles.controlTools}>
        <div className={styles.icon}>
          <Tooltip placement="right" title="退出登录">
            <LogoutOutlined />
          </Tooltip>
        </div>
        <div className={styles.icon}>
          <Tooltip placement="right" title="设置">
            <SettingOutlined />
          </Tooltip>
        </div>
        <div className={styles.icon}>
          <Tooltip placement="right" title="个人中心">
            <UserOutlined />
          </Tooltip>
        </div>
      </div>
      <div className={styles.controlMenu}>
        <MenuOutlined />
      </div>
    </div>
  )
}

export default Control
