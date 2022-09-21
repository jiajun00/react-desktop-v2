import React from "react"
import styles from './index.module.scss'

interface Props {
  children: React.ReactNode
}

const StartToolsBar: React.FC<Props> = (props) => {
  const {children} = props
  return (
    <div className={styles.startToolsBar}>
      {children}
    </div>
  )
}

export default StartToolsBar