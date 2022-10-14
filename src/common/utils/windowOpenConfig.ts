import { IMAGE_TYPE, WINDOW_OPEN_WITH } from '@/common/constants'

const windowOpenConfig = {
  userinfo: {
    id: 9997,
    title: '个人中心',
    image: {
      type: IMAGE_TYPE.ANTD,
      name: 'UserOutlined'
    },
    openWith: {
      type: WINDOW_OPEN_WITH.COMPONENT,
      name: 'userinfo'
    }
  },
  systemSet: {
    id: 9998,
    title: '系统设置',
    image: {
      type: IMAGE_TYPE.ANTD,
      name: 'SettingOutlined'
    },
    openWith: {
      type: WINDOW_OPEN_WITH.IFRAME,
      path: '/apps/manage/privileges?type=menu'
    }
  },
  backgroundSet: {
    id: 9999,
    title: '背景设置',
    image: {
      type: IMAGE_TYPE.ANTD,
      name: 'PictureOutlined'
    },
    openWith: {
      type: WINDOW_OPEN_WITH.COMPONENT,
      name: 'backgroundSet'
    }
  }
}

export default windowOpenConfig
