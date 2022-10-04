import React from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'

interface Props {
  loading: boolean
  children: React.ReactNode
}

const Content: React.FC<Props> = ({ loading, children }) => {
  return (
    <div className={styles.content}>
      {loading ? (
        <div className={styles.loading}>
          <Spin size="large" spinning={loading} />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Content
