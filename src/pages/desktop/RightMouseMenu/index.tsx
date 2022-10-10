import React from 'react'
import {
  RedoOutlined,
  SortAscendingOutlined,
  PictureOutlined,
  UserOutlined,
  FieldTimeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'
import classnames from 'classnames'

const RightMouseMenu: React.FC = () => {
  return (
    <div className={styles.rightMouseMenuBox} style={{ top: 100, left: 300 }}>
      <div className={styles.item}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <FieldTimeOutlined />
          </div>
          按日期排序
        </div>
      </div>
      <div className={classnames(styles.item, styles.bottom)}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <SortAscendingOutlined />
          </div>
          按名称排序
        </div>
      </div>
      <div className={classnames(styles.item, styles.bottom)}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <RedoOutlined />
          </div>
          刷新
        </div>
        <div className={styles.keyboard}>F5</div>
      </div>
      <div className={styles.item}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <SettingOutlined />
          </div>
          设置
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <UserOutlined />
          </div>
          个人中心
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <PictureOutlined />
          </div>
          自定义背景
        </div>
      </div>
    </div>
  )
}

export default RightMouseMenu
