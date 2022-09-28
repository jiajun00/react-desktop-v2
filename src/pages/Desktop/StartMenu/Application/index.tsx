import React from 'react'
import styles from './index.module.scss'
import startImg from '@img/icon/start/home.png'

interface Props {}

const Application: React.FC<Props> = props => {
  return (
    <div className={styles.applicationBox}>
      <div className={styles.applicationScroll}>
        <div className={styles.application}>
          <div className={styles.appBox}>
            <div className={styles.icon}>
              <img className={styles.iconImg} src={startImg} alt="app" />
            </div>
            <div className={styles.title}>应用名称</div>
          </div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
          <div className={styles.appBox}></div>
        </div>
      </div>
    </div>
  )
}

export default Application
