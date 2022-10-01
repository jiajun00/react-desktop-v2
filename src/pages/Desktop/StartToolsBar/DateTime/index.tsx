import React from 'react'
import styles from './index.module.scss'
import useMethods from '@utils/useMethods'

interface Time {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  week: string
}

const DateTime: React.FC = () => {
  const [dataTime, setDataTime] = React.useState<Time>({
    day: '',
    hour: '',
    minute: '',
    month: '',
    week: '',
    year: ''
  })
  React.useEffect(() => {
    getDateTime()
  }, [])
  const { getDateTime } = useMethods({
    getDateTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // 获取当前月份
      const day = date.getDate() // 获取当前是几号
      const weekIndex = date.getDay() //获取当前星期X(0-6,0代表星期天)
      const hour = date.getHours() //小时
      const minute = date.getMinutes() //分钟
      // const second = date.getSeconds() //秒
      const week_arr = ['日', '一', '二', '三', '四', '五', '六']
      const time: Time = {
        year: `${year}`,
        month: month <= 9 ? `0${month}` : `${month}`,
        day: day <= 9 ? `0${day}` : `${day}`,
        hour: hour <= 9 ? `0${hour}` : `${hour}`,
        minute: minute <= 9 ? `0${minute}` : `${minute}`,
        week: week_arr[weekIndex]
      }
      if (
        dataTime.minute !== time.minute ||
        dataTime.hour !== time.hour ||
        dataTime.day !== time.day
      ) {
        setDataTime(time)
      }
      setTimeout(getDateTime, 1000)
    }
  })
  return (
    <div className={styles.dateTimeBox}>
      <div>{`${dataTime.hour}:${dataTime.minute} 周${dataTime.week}`}</div>
      <div>{`${dataTime.year}/${dataTime.month}/${dataTime.day}`}</div>
    </div>
  )
}

export default DateTime
