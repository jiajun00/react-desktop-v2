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
import useStore, { MyState } from '@/store'

const RightMouseMenu: React.FC = () => {
  const rightMouseMenu = useStore((state: MyState) => state.rightMouseMenu)
  const closeRightMouseMenu = useStore(
    (state: MyState) => state.closeRightMouseMenu
  )
  return (
    <div
      id={`right_menu_${rightMouseMenu.id}`}
      className={styles.rightMouseMenuBox}
      style={{
        top: rightMouseMenu.top,
        left: rightMouseMenu.left,
        display: rightMouseMenu.show ? 'block' : 'none'
      }}
      onClick={() => closeRightMouseMenu()}>
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
      <div
        className={classnames(styles.item, styles.bottom)}
        onClick={() => {
          window.location.reload()
        }}>
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
