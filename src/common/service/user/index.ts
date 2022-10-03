import { Callback, post } from '@utils/request'
import { RoleInfo, UserInfo } from '@/store/baseInfoSlice'
import { App } from '@/store/deskSlice'
import { StartMenu } from '@/store/startMenuSlice'

export interface ResUserInfo {
  data: {
    userInfo: UserInfo
    appList: App[]
    startMenuList: StartMenu[]
    role: RoleInfo
  }
  code: number
}

export const getUserInfo = (success: Callback<ResUserInfo>) => {
  post('/api/user/getUserInfo', {}, success)
}
