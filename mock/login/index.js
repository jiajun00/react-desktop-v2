const Mock = require("mockjs")
const express = require("express")
const router = express.Router()
const result = require("../result")
const data = require('../date')

router.use("/login",function (req, res) {
  //调用mock方法模拟数据
  const userInfo = data.userInfo
  return res.json(result(userInfo))
})

module.exports = router
