import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { MenuProps, Button, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

interface Props {
  left: React.ReactNode | MenuItem[]
  right: React.ReactNode
  menuKeys?: string[]
}

type MenuItem = Required<MenuProps>['items'][number]

const LeftRight: React.FC<Props> = ({ left, right, menuKeys = [] }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  let leftNode: React.ReactNode
  if (left instanceof Array) {
    leftNode = (
      <>
        <div className={styles.control}>
          <Button
            className={styles.controlIcon}
            type="primary"
            onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={menuKeys}
          inlineCollapsed={collapsed}
          onSelect={item => navigate(item.key)}
          items={left.map(row => ({ ...row, key: `${row?.key}?type=menu` }))}
        />
      </>
    )
  } else {
    leftNode = left
  }
  return (
    <div className={styles.main}>
      <div className={styles.left}>{leftNode}</div>
      <div className={styles.right}>{right}</div>
    </div>
  )
}

export default LeftRight
