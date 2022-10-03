import create from 'zustand'
import windowListSlice, { WindowSlice } from './windowSlice'
import startMenuSlice, { StartMenuSlice } from './startMenuSlice'
import baseInfoSlice, { BaseInfoSlice } from './baseInfoSlice'
import deskSlice, { DeskSlice } from '@/store/deskSlice'

export type MyState = WindowSlice & StartMenuSlice & BaseInfoSlice & DeskSlice

const useStore = create<MyState>((set, get) => ({
  ...windowListSlice(set, get),
  ...startMenuSlice(set, get),
  ...baseInfoSlice(set, get),
  ...deskSlice(set, get)
}))

export default useStore
