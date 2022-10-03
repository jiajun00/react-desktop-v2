// 窗口状态
const WINDOW_STATUS = {
  NORMAL: 0, // 正常
  MIN: 1, // 最小化
  MAX: 2 // 最大化
}

// 窗口拖动类型
const WINDOW_DRAG = {
  RIGHT: 1,
  BOTTOM: 2,
  RIGHT_BOTTOM: 3
}

// 窗口最小宽高
const WINDOW_MIN = 300

// 图标类型
const IMAGE_TYPE = {
  IMG: 0, // 图片
  ANTD: 1, // ant design
  ALI: 2 // 阿里图标库
}

// 返回状态码
const RESPONSE_CODE = {
  SUCCESS: 0,
  RE_LOGIN: 401 // 需要重新登录
}

// 性别
const GENDER = {
  MALE: 0, // 男性
  FEMALE: 1, // 女性
  SECRECY: 2 // 保密
}

export { WINDOW_STATUS, IMAGE_TYPE, RESPONSE_CODE, WINDOW_DRAG, WINDOW_MIN }
