import { Callback, post } from '@utils/request'
import { UserInfo } from '@/store/baseInfoSlice'
import { App } from '@/store/deskSlice'

export interface LoginParam {
  username: string
  password: string
}

export interface LoginData {
  data: {
    userInfo: UserInfo
    appList: App[]
  }
  code: number
}

export const login = (param: LoginParam, success: Callback) => {
  post('/api/login', param, success)
}
