import React from 'react'
import styles from './index.module.scss'
import backgroundImg from '@img/wallpaper/dark/img0.jpg'
import Apps from './Apps'
import useStore, { MyState } from '@/store'
import { getUserInfo } from '@/common/service/user'

const Desk: React.FC = () => {
  const setAppList = useStore((state: MyState) => state.setAppList)
  const setStartMenuList = useStore((state: MyState) => state.setStartMenuList)
  const setUserInfo = useStore((state: MyState) => state.setUserInfo)
  const setRoleInfo = useStore((state: MyState) => state.setRoleInfo)
  React.useEffect(() => {
    getUserInfo(res => {
      const { data } = res
      setAppList(data.appList)
      setStartMenuList(data.startMenuList)
      setUserInfo(data.userInfo)
      setRoleInfo(data.role)
    })
  }, []) // eslint-disable-line
  return (
    <div
      className={styles.desk}
      style={{ backgroundImage: `url(${backgroundImg})` }}>
      <Apps />
    </div>
  )
}

export default Desk
