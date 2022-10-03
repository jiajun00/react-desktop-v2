const Mock = require("mockjs")
const express = require("express")
const data = require('../date')
const result = require("../result")
const router = express.Router()

router.use("/getUserInfo",function (req, res) {
  const userInfo = data.userInfo
  return res.json(result(userInfo))
})

router.use("/getToken",function (req, res) {
  //调用mock方法模拟数据
  const data = Mock.mock({token: Mock.Random.string( 32 )})
  return res.json(result(data))
})

module.exports = router
