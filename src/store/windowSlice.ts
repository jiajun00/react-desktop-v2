import { StoreApi } from 'zustand'
import { MyState } from './index'
import _ from 'lodash'

export interface Window {
  id: string
  width: number
  height: number
  top: number
  left: number
  zIndex: number
}

export interface WindowSlice {
  windowList: Window[]
  setWindowList: (windowList: Window[]) => void
  editWindow: (window: Window, index: number) => void
  closeWindowAll: () => void
}

const windowListSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  windowList: [], // 窗口列表
  setWindowList: (windowList: Window[]) => {
    // 设置窗口列表
    set(prev => ({ windowList: windowList }))
  },
  editWindow: (window: Window, index: number) => {
    // 窗口属性编辑
    set(({ windowList }) => {
      const list = _.cloneDeep(windowList)
      list[index] = window
      return {
        windowList: list
      }
    })
  },
  closeWindowAll: () => {
    // 关闭所有窗口
    set(() => ({ windowList: [] }))
  }
})

export default windowListSlice
