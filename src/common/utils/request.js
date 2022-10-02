/* eslint-disable */
import axios from 'axios'
import getToken from "./getToken"


const AxiosObj = (config) => {
  const  Axios = axios.create(config);

// 配置发送请求拦截器
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  window.requestCancel = source.cancel // 保存到全局变量，用于路由切换时调用

  Axios.interceptors.request.use(config => {
    config.cancelToken = source.token
    return config
  }, err => {
    return Promise.reject(err)
  })

  Axios.interceptors.response.use(response => {
    // Do something with response data
      return response;
    },
    err => {
      if (err && err.response) {
        console.log(err)
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)';
            break;
          case 401:
            err.message = '未授权，请重新登录(401)';
            break;
          case 403:
            err.message = '拒绝访问(403)';
            break;
          case 404:
            err.message = '请求出错(404)';
            break;
          case 408:
            err.message = '请求超时(408)';
            break;
          case 500:
            err.message = '服务器错误(500)';
            break;
          case 501:
            err.message = '服务未实现(501)';
            break;
          case 502:
            err.message = '网络错误(502)';
            break;
          case 503:
            err.message = '服务不可用(503)';
            break;
          case 504:
            err.message = '网络超时(504)';
            break;
          case 505:
            err.message = 'HTTP版本不受支持(505)';
            break;
          default:
            err.message = `连接出错(${err.response.status})!`;
        }
      } else {
        // err.message = '连接服务器失败!'
      }
    return Promise.reject(err);
  });
    return Axios
}


export const getData = (url, param = {},config = {
  timeout: window.global.timeout, //设置超时时间
  "headers": {
    'X-Custom-Header': 'foobar',
    responseType: "json",
    'content-type': 'application/json',
    "accessToken":localStorage.getItem('accessToken')
  },
  withCredentials:true
}) => {
    if(!localStorage.getItem('accessToken')){
      window.location.href = "/login"
    }
    const Axios = AxiosObj(config)
    return (
        Axios.get(`${url}`, {
            params: param
        })
    )
}

export const postData = (url, param = {},config = {
    timeout: window.global.timeout, //设置超时时间
    "headers": {
      'X-Custom-Header': 'foobar',
      responseType: "json",
      'content-type': 'application/json',
      "accessToken":localStorage.getItem('accessToken')
    },
    withCredentials:true
  }) => {
    if(!localStorage.getItem('accessToken')){
      getToken(() => {
        window.location.href = "/login"
      })
    }
    const Axios = AxiosObj(config)
    return (
      Axios.post(`${url}`, param)
    )
}


export const uploadData = (url, param = {},percentCompletedFun=()=>{}) => {
  const config = {
    timeout: window.global.timeout, //设置超时时间
    "headers": {
      'X-Custom-Header': 'foobar',
      responseType: "json",
      'content-type': 'multipart/form-data',
      "accessToken":localStorage.getItem('accessToken')
    },
    onUploadProgress: (progressEvent) => {
      percentCompletedFun(progressEvent)
    },
    withCredentials:true
  }
  if(!localStorage.getItem('accessToken')){
    getToken(()=>{
      window.location.href = "/login"
    })
  }

  const Axios = AxiosObj(config)
  return (
    Axios.post(`${url}`, param)
  )
}
