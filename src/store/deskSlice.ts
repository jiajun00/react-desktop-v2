import React from 'react'
import { StoreApi } from 'zustand'
import { MyState } from './index'
import { Image } from '@/components/ImageComponent'
import getId from '@utils/getId'
import vars from '@/common/style/vars.scss'

export interface App {
  id: number
  image: Image
  title: string
  openWith: OpenWith
}

export interface OpenWith {
  type: number
  path?: string
  name?: string
}

export interface RightMouseMenu {
  id: string
  show: boolean
  top?: number
  left?: number
}

export interface DeskSlice {
  appList: App[]
  setAppList: (value: App[]) => void
  rightMouseMenu: RightMouseMenu
  openRightMouseMenu: (event: React.MouseEvent) => void
  closeRightMouseMenu: () => void
}

const deskSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  appList: [] as App[],
  setAppList: (value: App[]) => {
    set(() => ({ appList: value }))
  },
  rightMouseMenu: {
    id: getId(),
    show: false
  },
  openRightMouseMenu: (event: React.MouseEvent) => {
    set(({ rightMouseMenu }) => {
      const menu: RightMouseMenu = {
        ...rightMouseMenu,
        show: true,
        top: event.clientY,
        left: event.clientX
      }
      if (
        document.body.clientWidth <
        event.clientX + parseInt(vars.rightMouseMenuWidth)
      ) {
        menu.left = event.clientX - parseInt(vars.rightMouseMenuWidth)
      }
      if (
        document.body.clientHeight - parseInt(vars.startToolsBarHeight) <
        event.clientY + parseInt(vars.rightMouseMenuHeight)
      ) {
        menu.top = event.clientY - parseInt(vars.rightMouseMenuHeight)
      }
      return { rightMouseMenu: menu }
    })
  },
  closeRightMouseMenu: () => {
    set(({ rightMouseMenu }) => ({
      rightMouseMenu: { ...rightMouseMenu, show: false }
    }))
  }
})

export default deskSlice
