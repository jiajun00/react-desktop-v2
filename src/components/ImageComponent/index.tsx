import React from 'react'
import * as Adi from '@ant-design/icons'
import { IMAGE_TYPE } from '@/common/constants'

interface Props {
  image: Image
  style?: React.CSSProperties
  className?: any
}

export interface Image {
  type: number
  src?: string
  name?: string
}

const ImageComponent: React.FC<Props> = ({ image, style, className }) => {
  let content = <></>
  if (image.type === IMAGE_TYPE.IMG) {
    content = (
      <img
        src={image.src}
        className={className}
        alt={image.src}
        style={style}
      />
    )
  }
  if (image.type === IMAGE_TYPE.ANTD && image.name) {
    // @ts-ignore
    const Icon = Adi[image.name] || <Adi.BorderOutlined className={className} />
    content = <Icon className={className} style={style} />
  }
  return content
}

export default ImageComponent
