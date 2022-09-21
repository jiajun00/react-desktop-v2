import React from "react"
import styles from './index.module.scss'
import Desk from "./Desk";
import StartToolsBar from "./StartToolsBar";

interface Props {
  deskNode: React.ReactNode
  startBarNode: React.ReactNode
}

const Framework: React.FC<Props> = (props) => {
  const {deskNode, startBarNode} = props
  return (
    <div className={styles.desktopFramework}>
      <Desk>
        {deskNode}
      </Desk>
      <StartToolsBar>
        {startBarNode}
      </StartToolsBar>
    </div>
  )
}

export default Framework