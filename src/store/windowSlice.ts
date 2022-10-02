import { StoreApi } from 'zustand'
import { MyState } from './index'
import _ from 'lodash'
import getId from '@utils/getId'
import logoImg from '@img/icon/start/home.png'
import type { Image } from '@/components/ImageComponent'

const id = getId()

const win1 = {
  id,
  title: '窗口标题名称',
  status: 0,
  style: {
    display: 'block',
    width: 800,
    height: 800,
    top: 200,
    left: 100,
    zIndex: 1
  },
  image: {
    type: 0,
    src: logoImg
  }
}

const win2 = {
  id: getId(),
  title: '窗口标题名称2',
  status: 0,
  style: {
    display: 'block',
    width: 800,
    height: 800,
    top: 230,
    left: 130,
    zIndex: 3
  },
  image: {
    type: 1,
    name: 'ConsoleSqlOutlined'
  }
}

export interface Window {
  id: string
  title: string
  status: number
  style: WindowStyle
  image: Image
}

export interface WindowStyle {
  display: string
  width: number | string
  height: number | string
  top: number
  left: number
  zIndex: number
}

export interface WindowSlice {
  windowActionId: string
  windowList: Window[]
  setWindowList: (windowList: Window[]) => void
  editWindow: (window: Window, id: string) => void
  setWindowStatus: (status: number, id: string) => void
  setWindowActionId: (id: string) => void
  closeWindow: (id: string) => void
  closeWindowAll: () => void
}

const windowListSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  windowActionId: id, // 当前正在打开窗口的id
  windowList: [win1, win2], // 窗口列表
  setWindowList: (windowList: Window[]) => {
    // 设置窗口列表
    set(prev => ({ windowList: windowList }))
  },
  editWindow: (window: Window, id: string) => {
    // 窗口属性编辑
    set(({ windowList }) => {
      const list = _.cloneDeep(windowList)
      const windowIndex = list.findIndex(row => row.id === id)
      list[windowIndex] = window
      return {
        windowList: list
      }
    })
  },
  setWindowStatus: (status: number, id: string) => {
    set(({ windowList }) => {
      const list = _.cloneDeep(windowList)
      const windowIndex = list.findIndex(row => row.id === id)
      const window = list[windowIndex]
      window.status = status
      return {
        windowList: list
      }
    })
  },
  setWindowActionId: (id: string) => {
    set(prev => ({ windowActionId: id }))
  },
  closeWindow: (id: string) => {
    set(({ windowList, windowActionId }) => {
      const list = _.cloneDeep(windowList)
      const windowIndex = list.findIndex(row => row.id === id)
      list.splice(windowIndex, 1)
      const result: { windowList: Window[]; windowActionId?: string } = {
        windowList: list
      }
      if (id === windowActionId && list.length > 0) {
        const maxZIndex = Math.max(
          ...list.map(item => {
            return item.style.zIndex
          })
        )
        const window = list.find(
          row => row.style.zIndex === maxZIndex
        ) as Window
        result.windowActionId = window.id
      }
      return result
    })
  },
  closeWindowAll: () => {
    // 关闭所有窗口
    set(() => ({ windowList: [] }))
  }
})

export default windowListSlice
