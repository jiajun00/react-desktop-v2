import create from "zustand";
import windowListSlice, { WindowSlice } from "./windowSlice";

export type MyState = WindowSlice;

const useStore = create<MyState>((set, get) => ({
  ...windowListSlice(set, get),
}));
