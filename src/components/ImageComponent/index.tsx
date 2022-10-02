import React from 'react'
import * as Adi from '@ant-design/icons'
import { IMAGE_TYPE } from '@/common/constants'

interface Props {
  image: Image
  style?: React.CSSProperties
}

export interface Image {
  type: number
  src?: string
  name?: string
}

const ImageComponent: React.FC<Props> = ({ image, style }) => {
  let content = <></>
  if (image.type === IMAGE_TYPE.IMG) {
    content = <img src={image.src} alt={image.src} style={style} />
  }
  if (image.type === IMAGE_TYPE.ANTD && image.name) {
    // @ts-ignore
    const Icon = Adi[image.name] || <Adi.BorderOutlined />
    content = <Icon style={style} />
  }
  return content
}

export default ImageComponent
