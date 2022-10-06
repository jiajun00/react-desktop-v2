import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from './index.module.scss'

interface BreadcrumbData {
  path?: string
  name: string
}

interface Props {
  children?: React.ReactNode
  breadcrumb?: BreadcrumbData[]
  style?: React.CSSProperties
  border?: boolean
  margin?: boolean
  padding?: boolean
  radius?: boolean
}

const View: React.FC<Props> = ({
  children,
  breadcrumb,
  style,
  border = false,
  margin = true,
  padding = true,
  radius = true
}) => {
  return (
    <div
      className={classnames(styles.viewBox, {
        [styles.viewBoxBorder]: border,
        [styles.viewBoxMargin]: margin,
        [styles.viewBoxPadding]: padding,
        [styles.viewBoxRadius]: radius
      })}
      style={style}>
      {breadcrumb && (
        <div className={styles.breadcrumbBox}>
          <Breadcrumb className={styles.breadcrumb}>
            {breadcrumb.map((row, index) => {
              const item = (
                <span
                  className={classnames(styles.breadcrumbItem, {
                    [styles.breadcrumbItemHover]:
                      (breadcrumb as BreadcrumbData[]).length !== index + 1
                  })}>
                  {row.name}
                </span>
              )
              const breadcrumbItem = row.path ? (
                <Link to={row.path}>{item}</Link>
              ) : (
                <>{item}</>
              )
              return (
                <Breadcrumb.Item key={index}>{breadcrumbItem}</Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
        </div>
      )}
      {children}
    </div>
  )
}

export default View
