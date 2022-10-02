import { StoreApi } from 'zustand'
import { MyState } from './index'

export interface UserInfo {
  address: string
  age: number
  birth: string
  email: string
  id: string
  married: boolean
  name: string
  gender: number
}

export interface BaseInfoSlice {
  userInfo: UserInfo
  setUserInfo: (value: UserInfo) => void
}

const baseInfoSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  userInfo: {} as UserInfo,
  setUserInfo: (value: UserInfo) => {
    set(() => ({ userInfo: value }))
  }
})

export default baseInfoSlice
