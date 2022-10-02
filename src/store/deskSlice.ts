import { StoreApi } from 'zustand'
import { MyState } from './index'
import { Image } from '@/components/ImageComponent'

export interface App {
  id: number
  image: Image
  title: string
}

export interface DeskSlice {
  appList: App[]
  setAppList: (value: App[]) => void
}

const deskSlice = (
  set: StoreApi<MyState>['setState'],
  get: StoreApi<MyState>['getState']
) => ({
  appList: [] as App[],
  setAppList: (value: App[]) => {
    set(() => ({ appList: value }))
  }
})

export default deskSlice
