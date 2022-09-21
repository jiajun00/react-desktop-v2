import React from "react"
import Framework from "./Framework";

interface Props {

}

const Desktop: React.FC<Props> = () => {
  return (
    <Framework
      deskNode={
        <div>desk</div>
      }
      startBarNode={
        <div>start</div>
      }
    />
  )
}

export default Desktop