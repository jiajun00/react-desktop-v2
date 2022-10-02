import axios from 'axios'
import { str_val } from './common'

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
