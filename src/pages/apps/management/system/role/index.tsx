import React from 'react'
import View from '@/components/View'
import { Space } from 'antd'
import styles from './index.module.scss'
import {
  getRoleList,
  RoleListData,
  RoleListParams
} from '@/common/service/system'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Table from '@/components/Table'

interface PrivilegesData {
  id: string
  name: string
  pid: string
}

export interface RoleData {
  id: string
  roleName: string
  privileges: PrivilegesData[] | '*'
}

const Role: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<RoleListData>({
    current: 0,
    list: [],
    total: 0,
    totalPage: 0
  })
  const [tableLoading, setTableLoading] = React.useState<boolean>(false)
  const getList = (values: RoleListParams) => {
    setTableLoading(true)
    const params = {
      ...values
    }
    setTimeout(() => {
      getRoleList(params, res => {
        const { data } = res
        setDataSource(data)
        setTableLoading(false)
      })
    }, 1000)
  }
  const columns = [
    {
      title: '角色名',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 120
    },
    {
      title: '权限',
      dataIndex: 'privileges',
      key: 'privileges',
      render: (privileges: PrivilegesData[] | '*') =>
        privileges === '*'
          ? '*'
          : privileges.map((row: PrivilegesData) => row.name).join('，')
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 100,
      render: (id: string, record: RoleData) => {
        return (
          <Space size="middle">
            <a>
              <EditOutlined />
            </a>
            <a>
              <DeleteOutlined onClick={() => console.log(id)} />
            </a>
          </Space>
        )
      }
    }
  ]
  return (
    <div className={styles.role}>
      <View margin={false} radius={false} title="角色管理" />
      <View>
        <Table
          rowKey="id"
          loading={tableLoading}
          dataSource={dataSource}
          columns={columns}
          search={{
            placeholder: '请输入角色名搜索',
            name: 'roleName'
          }}
          reload
          getData={getList}
          addFun={() => console.log('add')}
          deleteFun={values => console.log(values)}
        />
      </View>
    </div>
  )
}

export default Role
