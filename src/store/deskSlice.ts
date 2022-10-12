import React from 'react'
import { StoreApi } from 'zustand'
import { MyState } from './index'
import { Image } from '@/components/ImageComponent'
import getId from '@utils/getId'
import vars from '@/common/style/vars.scss'
import bg1Img from '@img/wallpaper/dark/img0.jpg'
import bg2Img from '@img/wallpaper/default/img0.jpg'
import bg3Img from '@img/wallpaper/ThemeA/img0.jpg'
import bg4Img from '@img/wallpaper/ThemeB/img0.jpg'
import bg5Img from '@img/wallpaper/ThemeB/img1.jpg'
import bg6Img from '@img/wallpaper/ThemeB/img2.jpg'

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

interface Background {
  id: string
  src: string
}

export interface DeskSlice {
  backgroundList: Background[]
  backgroundImg: string
  setBackgroundImg: (src: string) => void
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
  backgroundList: [
    { id: getId(), src: bg1Img },
    { id: getId(), src: bg2Img },
    { id: getId(), src: bg3Img },
    { id: getId(), src: bg4Img },
    { id: getId(), src: bg5Img },
    { id: getId(), src: bg6Img }
  ],
  backgroundImg: bg1Img,
  setBackgroundImg: (src: string) => {
    set({ backgroundImg: src })
  },
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
