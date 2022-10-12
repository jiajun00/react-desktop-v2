import { StoreApi } from 'zustand'
import { MyState } from './index'
import _ from 'lodash'
import getId from '@utils/getId'
import type { Image } from '@/components/ImageComponent'
import { App, OpenWith } from '@/store/deskSlice'
import { WINDOW_STATUS } from '@/common/constants'

const defaultWindowStyle = {
  display: 'block',
  width: 900,
  height: 600,
  top: 100,
  left: 50,
  zIndex: 1000
}

export interface Window {
  id: string
  appId: number
  title: string
  status: number
  style: WindowStyle
  image: Image
  openWith: OpenWith
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
  openWindow: (app: App) => void
  setWindowList: (windowList: Window[]) => void
  editWindow: (window: Window) => void
  setWindowStatus: (status: number, id: string) => void
  setWindowActionId: (id: string, type?: boolean) => void
  closeWindow: (id: string) => void
  closeWindowAll: () => void
}

function resetWindowListZIndex(windowList: Window[], index: number) {
  const newWindowList = _.cloneDeep(windowList)
  const window = newWindowList[index] as Window
  const curWindowZIndex = _.clone(window.style.zIndex) // 当前窗口zIndex值
  const windowZIndexMax = Math.max(...windowList.map(row => row.style.zIndex))
  newWindowList.map(row => {
    const win = {
      ...row
    }
    if (row.style.zIndex === windowZIndexMax) {
      win.style.zIndex = curWindowZIndex
    }
    return win
  })
  window.style.zIndex = windowZIndexMax
  return newWindowList
}

const windowListSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  windowActionId: '', // 当前正在打开窗口的id
  windowList: [], // 窗口列表
  // 打开窗口
  openWindow: (app: App) => {
    set(({ windowList }) => {
      const windowIndex = windowList.findIndex(row => row.appId === app.id)
      let newWindowList
      let windowId
      if (windowIndex >= 0) {
        newWindowList = resetWindowListZIndex(windowList, windowIndex)
        windowId = windowList[windowIndex].id
      } else {
        newWindowList = _.cloneDeep(windowList)
        const windowNum = windowList.length
        const window: Window = {
          id: getId(),
          appId: app.id,
          title: app.title,
          image: app.image,
          status: WINDOW_STATUS.NORMAL,
          style: {
            ...defaultWindowStyle,
            left: defaultWindowStyle.left + 20 * windowNum,
            top: defaultWindowStyle.top + 20 * windowNum,
            zIndex: defaultWindowStyle.zIndex + 100 * windowNum
          },
          openWith: app.openWith
        }
        newWindowList.push(window)
        windowId = window.id
      }
      return { windowList: newWindowList, windowActionId: windowId }
    })
  },
  // 设置窗口列表
  setWindowList: (windowList: Window[]) => {
    set(() => ({ windowList: windowList }))
  },
  // 窗口属性编辑
  editWindow: (window: Window) => {
    set(({ windowList }) => {
      const list = _.cloneDeep(windowList)
      const windowIndex = list.findIndex(row => row.id === window.id)
      list[windowIndex] = window
      return {
        windowList: list
      }
    })
  },
  // 设置窗口最大化、最小化、正常
  setWindowStatus: (status: number, id: string) => {
    set(({ windowList, setWindowActionId }) => {
      const list = _.cloneDeep(windowList)
      const windowIndex = list.findIndex(row => row.id === id)
      const window = list[windowIndex]
      window.status = status
      if (status === WINDOW_STATUS.MIN) {
        if (windowList.length === 1) {
          setWindowActionId('')
        } else {
          const maxZIndex = Math.max(
            ...list.map(item => {
              if (item.id === id) {
                return 0
              } else {
                return item.style.zIndex
              }
            })
          )
          const window = list.find(
            row => row.style.zIndex === maxZIndex
          ) as Window
          setWindowActionId(window.id, true)
        }
      }
      return {
        windowList: list
      }
    })
  },
  setWindowActionId: (id: string, type = false) => {
    set(({ windowList }) => {
      const res = { windowActionId: id, windowList }
      // 重新排序zIndex
      if (type) {
        const windowIndex = windowList.findIndex(row => row.id === id)
        const newWindowList = resetWindowListZIndex(windowList, windowIndex)
        newWindowList[windowIndex].status = WINDOW_STATUS.NORMAL
        res.windowList = newWindowList
      }
      return res
    })
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
