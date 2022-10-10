import React from 'react'
import { Breadcrumb } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
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
  back?: { (event: React.MouseEvent): void }
  extra?: React.ReactNode
  title?: string
  subTitle?: string
  footer?: React.ReactNode
  style?: React.CSSProperties
  border?: boolean
  margin?: boolean
  padding?: boolean
  radius?: boolean
}

const View: React.FC<Props> = ({
  children,
  breadcrumb,
  back,
  extra,
  title,
  subTitle,
  footer,
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
          {!!back && (
            <div className={styles.back} onClick={event => back(event)}>
              <ArrowLeftOutlined />
            </div>
          )}
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
      <div className={styles.header}>
        <div className={styles.titleBox}>
          {title && <div className={styles.title}>{title}</div>}
          {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
        </div>
        {extra && <div className={styles.extra}>{extra}</div>}
      </div>
      {children}
      {footer && (
        <>
          <div className={styles.footerBox} />
          <div className={styles.footer}>{footer}</div>
        </>
      )}
    </div>
  )
}

export default View
