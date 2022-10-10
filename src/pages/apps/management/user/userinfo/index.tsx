import React from 'react'
import View from '@/components/View'
import { Button, Tabs } from 'antd'

const Userinfo: React.FC = () => {
  return (
    <div>
      <View
        border
        margin={false}
        radius={false}
        breadcrumb={[{ name: '中文', path: '/' }, { name: '个人中心' }]}
        extra={<Button type="primary">按钮</Button>}
        back={(e: any) => console.log(e)}
        title="主标题"
        subTitle="副标题asd"
        footer={
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="选项一" key="1" />
            <Tabs.TabPane tab="选项二" key="2" />
          </Tabs>
        }>
        info
      </View>
      <View border title="标题" extra={<Button type="primary">按钮</Button>}>
        content
      </View>
    </div>
  )
}

export default Userinfo
