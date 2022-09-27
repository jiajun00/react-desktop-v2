import { StoreApi } from 'zustand'
import { MyState } from './index'

export interface StartMenuSlice {
  showStartMenu: boolean
  setShowStartMenu: (value: boolean) => void
}

const startMenuSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  showStartMenu: false,
  setShowStartMenu: (value: boolean) => {
    set({ showStartMenu: value })
  }
})

export default startMenuSlice
