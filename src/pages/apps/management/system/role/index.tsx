import React from 'react'
import View from '@/components/View'
import { Space, Modal } from 'antd'
import styles from './index.module.scss'
import {
  getRoleList,
  RoleListData,
  RoleListParams
} from '@/common/service/system'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Table from '@/components/Table'
import useMethods from '@utils/useMethods'
import RoleForm, { OnRef } from './RoleForm'

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

export interface FormModal {
  open: boolean
  loading: boolean
  title: string
  initValues?: RoleData
}

const Role: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<RoleListData>({
    current: 0,
    list: [],
    total: 0,
    totalPage: 0
  })
  const [tableLoading, setTableLoading] = React.useState<boolean>(false)
  const initFormModal = {
    title: '',
    open: false,
    loading: false
  }
  const [formModal, setFormModal] = React.useState<FormModal>(initFormModal)
  const roleFormRef = React.useRef<OnRef>()
  const { getList, submit, openEditRoleForm } = useMethods({
    getList(values: RoleListParams) {
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
    },
    openEditRoleForm(record) {
      setFormModal(prevState => {
        const initValues = {
          id: record.id,
          roleName: record.roleName,
          privileges: record.privileges.map((row: PrivilegesData) => row.id)
        }
        return {
          ...prevState,
          title: `编辑角色-${record.roleName}`,
          open: true,
          initValues
        }
      })
    },
    submit: () => {
      roleFormRef.current?.submit(values => {
        console.log(values)
      })
    }
  })
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
            {record.privileges !== '*' && (
              <>
                <a>
                  <EditOutlined
                    onClick={() => {
                      openEditRoleForm(record)
                    }}
                  />
                </a>
                <a>
                  <DeleteOutlined onClick={() => console.log(id)} />
                </a>
              </>
            )}
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
          addFun={() => {
            setFormModal(prevState => ({
              ...prevState,
              open: true,
              title: '新增角色'
            }))
          }}
          deleteFun={values => console.log(values)}
        />
      </View>
      <Modal
        title={formModal.title}
        maskClosable={false}
        open={formModal.open}
        onOk={submit}
        confirmLoading={formModal.loading}
        onCancel={() => setFormModal(initFormModal)}
        destroyOnClose={true}>
        {formModal.open && (
          <RoleForm onRef={roleFormRef} initialValues={formModal.initValues} />
        )}
      </Modal>
    </div>
  )
}

export default Role
