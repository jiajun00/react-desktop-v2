import React from 'react'
import { OpenWith } from '@/store/deskSlice'
import IframeWith from './IframeWith'
import { WINDOW_OPEN_WITH } from '@/common/constants'
import ComponentsWith from './ComponentsWith'
import { PageComponentName } from './ComponentsWith/PageComponents'

interface Props {
  openWith: OpenWith
  windowId: string
}

const Open: React.FC<Props> = ({ openWith, windowId }) => {
  let content = <></>
  if (openWith.type === WINDOW_OPEN_WITH.IFRAME) {
    content = <IframeWith path={openWith.path as string} windowId={windowId} />
  }
  if (openWith.type === WINDOW_OPEN_WITH.COMPONENT) {
    content = (
      <ComponentsWith
        name={openWith.name as PageComponentName}
        windowId={windowId}
      />
    )
  }
  return content
}

export default Open
