import React from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'

interface Props {
  path: string
  windowId: string
}

const IframeWith: React.FC<Props> = ({ path, windowId }) => {
  const [isLoad, setIsLoad] = React.useState<boolean>(false)
  return (
    <div className={styles.iframeBox}>
      <iframe
        className={styles.iframe}
        title={`iframe_${windowId}`}
        id={`window_iframe_${windowId}`}
        src={path}
        frameBorder="0"
        onLoad={() => setIsLoad(true)}
      />
      {!isLoad && (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}

export default IframeWith
