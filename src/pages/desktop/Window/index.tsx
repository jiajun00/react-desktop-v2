import React from 'react'
import styles from './index.module.scss'
import WindowContext from './WindowContext'
import type { Window as WindowType } from '@/store/windowSlice'
import WindowBox from './WindowBox'
import Open from './Open'

interface Props {
  window: WindowType
  index: number
}

const Window: React.FC = () => {
  const { window } = React.useContext(WindowContext)
  return (
    <WindowBox>
      <Open openWith={window.openWith} windowId={window.id} />
    </WindowBox>
  )
}

const WindowWithContext: React.FC<Props> = props => {
  const { window, index } = props
  return (
    <WindowContext.Provider
      value={{
        window,
        id: window.id,
        index
      }}>
      <Window />
    </WindowContext.Provider>
  )
}

export default WindowWithContext
