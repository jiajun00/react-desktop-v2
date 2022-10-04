import React from 'react'
import {
  MenuOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Tooltip, Modal } from 'antd'
import styles from './index.module.scss'
import useMethods from '@utils/useMethods'
import useStore, { MyState } from '@/store'

const Control: React.FC = () => {
  const setShowStartMenu = useStore((state: MyState) => state.setShowStartMenu)
  const { logout } = useMethods({
    logout() {
      Modal.confirm({
        title: '是否确定退出登录?',
        icon: <ExclamationCircleOutlined />,
        content: '退出登录后需要重新登录',
        cancelText: '取消',
        okText: '退出',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  })
  return (
    <div className={styles.control}>
      <div
        className={styles.controlTools}
        onClick={() => setShowStartMenu(false)}>
        <Tooltip
          overlayClassName={styles.description}
          placement="right"
          title="退出登录">
          <div className={styles.icon} onClick={() => logout()}>
            <LogoutOutlined />
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName={styles.description}
          placement="right"
          title="设置">
          <div className={styles.icon}>
            <SettingOutlined />
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName={styles.description}
          placement="right"
          title="个人中心">
          <div className={styles.icon}>
            <UserOutlined />
          </div>
        </Tooltip>
      </div>
      <div className={styles.controlMenu}>
        <MenuOutlined />
      </div>
    </div>
  )
}

export default Control
