import axios from 'axios'

//判断是否包含字符串
function str_val(str: any, char: string) {
  if (typeof str !== 'string') {
    console.log('错误：这不是一个字符串')
    return false
  }
  if (str.indexOf(char) >= 0) {
    return true
  } else {
    return false
  }
}

//获取token
function getToken(callback = () => {}) {
  const api = '/api/user/getToken'
  axios
    .post(api + (str_val(api, '?') ? '&AppID=1' : '?AppID=1'), {})
    .then(async result => {
      await localStorage.setItem('accessToken', result.data.token)
      callback()
    })
}

export default getToken
