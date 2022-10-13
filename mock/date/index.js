const Mock = require("mockjs")

const userInfo = Mock.mock({
  "appList|15": [
    {
      "id|+1": 1,
      "title": "@ctitle(4, 7)",
      "image": {
        type: 0,
        src: 'https://react-desktop.oss-cn-shenzhen.aliyuncs.com/images/logo/file/file.png'
      },
      openWith: {
        type: 0,
        path: 'https://www.ynedu.plus'
      }
    }
  ],
  "startMenuList|8": [
    {
      "id|+1": 1,
      "title": "@ctitle(4, 6)",
      "image": {
        type: 0,
        src: 'https://react-desktop.oss-cn-shenzhen.aliyuncs.com/images/logo/file/file.png'
      },
      openWith: {
        type: 1,
        name: 'userinfo'
      }
    }
  ],
  userinfo: {
    id: Mock.Random.id(),
    name: "@cname",
    age: Mock.Random.integer(20, 50),
    married: Mock.Random.boolean(),
    birth: Mock.Random.datetime("yyyy-MM-dd HH:mm:ss"),  // 值是指定格式的日期字符串
    // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
    address: `${Mock.Random.province()}-${Mock.Random.city()}-${Mock.Random.county()}`,
    email: Mock.Random.email("qq.com"),
    gender: Mock.Random.integer(0, 2),
  },
  role: {
    id: 1,
    roleName: '系统管理员'
  }
})

const roleList = Mock.mock({
  "list": [
    {
      "id": 1,
      "roleName": "系统管理员",
      "privileges": '*'
    },
    {
      "id": 2,
      "roleName": "总经理",
      "privileges": [
        {
          id: 1,
          name: '权限管理',
          pid: 0
        },
        {
          id: 2,
          name: '角色管理',
          pid: 0
        },
        {
          id: 3,
          name: '员工管理',
          pid: 0
        },
        {
          id: 4,
          name: '报表管理',
          pid: 0
        },
        {
          id: 5,
          name: '考勤管理',
          pid: 0
        },
        {
          id: 6,
          name: '绩效管理',
          pid: 0
        }
      ]
    },
    {
      "id": 3,
      "roleName": "部门经理",
      "privileges": [
        {
          id: 1,
          name: '权限管理',
          pid: 0
        },
        {
          id: 2,
          name: '角色管理',
          pid: 0
        }
      ]
    }
  ]
})

module.exports = {
  userInfo,
  roleList
}
