import create from 'zustand'
import windowListSlice, { WindowSlice } from './windowSlice'
import startMenuSlice, { StartMenuSlice } from './startMenuSlice'

export type MyState = WindowSlice & StartMenuSlice

const useStore = create<MyState>((set, get) => ({
  ...windowListSlice(set, get),
  ...startMenuSlice(set, get)
}))

export default useStore
