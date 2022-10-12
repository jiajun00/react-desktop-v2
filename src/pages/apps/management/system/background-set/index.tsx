import React from 'react'
import styles from './index.module.scss'
import View from '@/components/View'
import { Button } from 'antd'
import useStore, { MyState } from '@/store'
import classnames from 'classnames'

const BackgroundSet: React.FC = () => {
  const backgroundList = useStore((state: MyState) => state.backgroundList)
  const setBackgroundImg = useStore((state: MyState) => state.setBackgroundImg)
  const backgroundImg = useStore((state: MyState) => state.backgroundImg)
  const [img, setImg] = React.useState<string>(backgroundImg)
  return (
    <View
      margin={false}
      radius={false}
      className={styles.backgroundSetBox}
      breadcrumb={[{ name: '系统设置' }, { name: '桌面背景' }]}
      title="桌面背景设置">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>预览</div>
          <div>
            <Button type="primary" onClick={() => setBackgroundImg(img)}>
              保存
            </Button>
          </div>
        </div>
        <div className={styles.view}>
          <img className={styles.viewImg} src={img} alt="view" />
        </div>
        <div className={styles.listBox}>
          {backgroundList.map(row => (
            <div
              key={row.id}
              className={classnames(styles.bg, {
                [styles.active]: row.src === img
              })}
              onClick={() => setImg(row.src)}>
              <img className={styles.bgImg} src={row.src} alt={row.id} />
            </div>
          ))}
        </div>
      </div>
    </View>
  )
}

export default BackgroundSet
