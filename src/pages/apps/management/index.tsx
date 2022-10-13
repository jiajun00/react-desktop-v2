import React from 'react'
import Routers from './Routers'
import { AlignLeftOutlined, UserOutlined } from '@ant-design/icons'
import { useSearchParams, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import LeftRight from '@/components/Layout/LeftRight'

const Management: React.FC = () => {
  const [params] = useSearchParams()
  const location = useLocation()
  const type = params.getAll('type')[0]
  if (type === 'menu') {
    return (
      <LeftRight
        left={[
          {
            label: '权限管理',
            key: '/apps/manage/privileges',
            icon: <AlignLeftOutlined />
          },
          {
            label: '角色管理',
            key: '/apps/manage/role',
            icon: <UserOutlined />
          }
        ]}
        menuKeys={[`${location.pathname}${location.search}`]}
        right={<Routers />}
      />
    )
  } else {
    return <Routers />
  }
}

export default Management
