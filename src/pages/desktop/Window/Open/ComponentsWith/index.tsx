import React from 'react'
import styles from './index.module.scss'
import PageComponents, { PageComponentName } from './PageComponents'

interface Props {
  name: PageComponentName
  windowId: string
}

const ComponentsWith: React.FC<Props> = ({ name }) => {
  const PageComponent = PageComponents[name]
  return (
    <div className={styles.page}>
      <PageComponent />
    </div>
  )
}

export default ComponentsWith
