import { StoreApi } from 'zustand'
import { MyState } from './index'
import { Image } from '@/components/ImageComponent'
import { OpenWith } from '@/store/deskSlice'

export interface StartMenu {
  id: number
  title: string
  image: Image
  openWith: OpenWith
}

export interface StartMenuSlice {
  showStartMenu: boolean
  setShowStartMenu: (value: boolean) => void
  toggleShowStartMenu: () => void
  startMenuList: StartMenu[]
  setStartMenuList: (value: StartMenu[]) => void
}

const startMenuSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  showStartMenu: false,
  setShowStartMenu: (value: boolean) => {
    set({ showStartMenu: value })
  },
  toggleShowStartMenu: () => {
    set(state => ({ showStartMenu: !state.showStartMenu }))
  },
  startMenuList: [] as StartMenu[],
  setStartMenuList: (value: StartMenu[]) => {
    set({ startMenuList: value })
  }
})

export default startMenuSlice
