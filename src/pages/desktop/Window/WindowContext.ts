import React from 'react'
import type { Window } from '@/store/windowSlice'

export interface WindowContextType {
  window: Window
  id: string
  index: number
}

export default React.createContext<WindowContextType>({
  window: {} as Window,
  id: '',
  index: 0
})
