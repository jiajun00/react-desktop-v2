/* eslint-disable */
import axios, { AxiosRequestConfig } from 'axios'
import { message, notification } from 'antd'
import getToken from './getToken'
import NProgress from 'nprogress'
import { str_val } from './common'
import { RESPONSE_CODE } from '../constants'
import { LoginParam } from '../service/login'

interface MyResponseType<T = any> {
  code: number
  data: T
  msg: string
}

const AxiosObj = (config: AxiosRequestConfig | any) => {
  const Axios = axios.create(config)

  // 配置发送请求拦截器
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  window.requestCancel = source.cancel // 保存到全局变量，用于路由切换时调用

  Axios.interceptors.request.use(
    config => {
      config.cancelToken = source.token
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  Axios.interceptors.response.use(
    response => {
      // Do something with response data
      return response
    },
    err => {
      if (err && err.response) {
        console.log(err)
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)'
            break
          case 401:
            err.message = '未授权，请重新登录(401)'
            break
          case 403:
            err.message = '拒绝访问(403)'
            break
          case 404:
            err.message = '请求出错(404)'
            break
          case 408:
            err.message = '请求超时(408)'
            break
          case 500:
            err.message = '服务器错误(500)'
            break
          case 501:
            err.message = '服务未实现(501)'
            break
          case 502:
            err.message = '网络错误(502)'
            break
          case 503:
            err.message = '服务不可用(503)'
            break
          case 504:
            err.message = '网络超时(504)'
            break
          case 505:
            err.message = 'HTTP版本不受支持(505)'
            break
          default:
            err.message = `连接出错(${err.response.status})!`
        }
      } else {
        // err.message = '连接服务器失败!'
      }
      return Promise.reject(err)
    }
  )
  return Axios
}

export const getData = (
  url: string,
  param = {},
  config = {
    timeout: window.global.timeout, //设置超时时间
    headers: {
      'X-Custom-Header': 'foobar',
      responseType: 'json',
      'content-type': 'application/json',
      accessToken: localStorage.getItem('accessToken')
    },
    withCredentials: true
  }
) => {
  if (!localStorage.getItem('accessToken')) {
    window.location.href = '/login'
  }
  const Axios = AxiosObj(config)
  return Axios.get<MyResponseType>(`${url}`, {
    params: param
  })
}

export const postData = (
  url: string,
  param = {},
  config = {
    timeout: window.global.timeout, //设置超时时间
    headers: {
      'X-Custom-Header': 'foobar',
      responseType: 'json',
      'content-type': 'application/json',
      accessToken: localStorage.getItem('accessToken')
    },
    withCredentials: true
  }
) => {
  if (!localStorage.getItem('accessToken')) {
    getToken(() => {
      window.location.href = '/login'
    })
  }
  const Axios = AxiosObj(config)
  return Axios.post<MyResponseType>(`${url}`, param)
}

export const uploadData = (
  url: any,
  param = {},
  percentCompletedFun = (argv: any) => {}
) => {
  const config = {
    timeout: window.global.timeout, //设置超时时间
    headers: {
      'X-Custom-Header': 'foobar',
      responseType: 'json',
      'content-type': 'multipart/form-data',
      accessToken: localStorage.getItem('accessToken')
    },
    onUploadProgress: (progressEvent: any) => {
      percentCompletedFun(progressEvent)
    },
    withCredentials: true
  }
  if (!localStorage.getItem('accessToken')) {
    getToken(() => {
      window.location.href = '/login'
    })
  }

  const Axios = AxiosObj(config)
  return Axios.post<MyResponseType>(`${url}`, param)
}

/**
 *
 * @param api 请求的地址
 * @param param 参数对象
 * @param success 请求成功后的回调
 * @param all 请求无论成功失败都会调用的一个回调，用于如loading的显示与消除
 * @param errorFun 错误的回调
 */
export interface Callback {
  (data: any): void
}
export const post = (
  api: string,
  param: object,
  success: Callback,
  all?: Callback,
  errorFun?: Callback
): void => {
  (async () => {
    try {
      NProgress.start()
      const response = await postData(
        api + (str_val(api, '?') ? '&AppID=1' : '?AppID=1'),
        param
      )
      if (response.data.code == 0) {
        success(response.data)
      } else if (
        response.data.code == RESPONSE_CODE.RE_LOGIN ||
        response.data.msg === '请先登录'
      ) {
        getToken(() => {
          if (window.self != window.top) {
            if (window.top) {
              // iframe打开的跳转
              window.top.location.href = '/login'
            }
          } else {
            let url = window.location.href
            const router_regex = /\/[Ii]ndex/
            if (router_regex.test(url)) {
            } else {
              const regex = /redirect=/g
              const isRedirect = regex.test(url)
              let redirect_url = '/login'
              if (isRedirect) {
                window.location.href = url
              } else {
                url = encodeURIComponent(url)
                redirect_url += '?redirect=' + url
                window.location.href = redirect_url
              }
            }
          }
        })
      } else {
        errorFun?.(response.data)
        console.log('get_error', api, response)
        notification['error']({
          message: '警告',
          description: response.data.msg
        })
      }
      all?.(response.data)
      NProgress.done()
    } catch (error) {
      NProgress.done()
      all?.(error)
      errorFun?.(error)
      message.warning('服务器正在开小差，请联系管理员或稍后再试！')
      console.log('get_catch: ', error)
    }
  })()
}
