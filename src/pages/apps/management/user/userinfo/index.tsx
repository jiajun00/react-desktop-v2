import React from 'react'
import View from '@/components/View'

const Userinfo: React.FC = () => {
  return (
    <div>
      <View
        border
        breadcrumb={[{ name: '中文', path: '/' }, { name: '个人中心' }]}>
        info
      </View>
      <div>content</div>
    </div>
  )
}

export default Userinfo
