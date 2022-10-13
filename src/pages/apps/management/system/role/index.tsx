import React from 'react'
import View from '@/components/View'
import { Space, Button } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import styles from './index.module.scss'
import { getRoleList } from '@/common/service/system'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Table from '@/components/Table'

interface Props {}

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

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const Role: React.FC<Props> = () => {
  const [dataSource, setDataSource] = React.useState<RoleData[]>([])
  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  })
  React.useEffect(() => {
    getRoleList(res => {
      const { data } = res
      setDataSource(data.list || [])
    })
  }, [])
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
          dataSource={dataSource}
          columns={columns}
          pagination={tableParams.pagination}
          search={{
            onSearch: values => console.log(values)
          }}
          reload={values => console.log(values)}
        />
      </View>
    </div>
  )
}

export default Role
