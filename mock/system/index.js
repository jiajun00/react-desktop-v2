const data = require("../date");
const result = require("../result");
const express = require("express");
const router = express.Router()

router.use("/getPrivileges",function (req, res) {
  //调用mock方法模拟数据
  const privilegesData = data.privilegesData
  return res.json(result(privilegesData))
})

router.use("/getRoleList",function (req, res) {
  //调用mock方法模拟数据
  const roleList = data.roleList
  return res.json(result(roleList))
})

module.exports = router
