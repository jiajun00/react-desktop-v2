const Mock = require("mockjs")
const express = require("express")
const router = express.Router();

router.use("/getUser",function (req, res) {
  //调用mock方法模拟数据
  const data = Mock.mock({
      'list|1-10': [
        {
          'qq_number|+1':"1302507089",
          'operator_name': "test",
          'wechat_number': "zixue0505",
          'year|+1': 2019
        }
      ],
      config:{
        page: 1,
        page_size: 10,
        total_num: 4,
        total_page: 1
      }
    }
  );
  return res.json(data);
})

router.use("/getToken",function (req, res) {
  //调用mock方法模拟数据
  const data = Mock.mock({token: Mock.Random.string( 32 )});
  return res.json(data);
})

module.exports = router;
