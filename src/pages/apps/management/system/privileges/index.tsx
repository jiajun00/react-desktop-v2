import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Tree, Popconfirm, Modal, Form, Input, TreeSelect } from 'antd'
import styles from './index.module.scss'
import type { DataNode } from 'antd/es/tree'
import View from '@/components/View'
import useMethods from '@utils/useMethods'
import { getPrivileges } from '@/common/service/system'

export interface PrivilegesData extends DataNode {
  title: string | React.ReactNode
  key: string
  pid: string
  children?: PrivilegesData[]
}

const Privileges: React.FC = () => {
  const [data, setData] = React.useState<PrivilegesData[]>([])
  const [isLoad, setIsLoad] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false)
  const { generalData, getPrivilegesData } = useMethods({
    generalData(data: PrivilegesData[]) {
      return data.map(row => {
        const obj: PrivilegesData = {
          ...row,
          title: (
            <>
              {row.title}
              <EditOutlined
                className={styles.icon}
                onClick={() => {
                  form.setFieldsValue({
                    name: row.title as string,
                    pid: row.pid
                  })
                  setOpen(true)
                }}
              />
              {!row.children && (
                <Popconfirm
                  title="是否确认删除该权限?"
                  onConfirm={() => {}}
                  okText="删除"
                  cancelText="取消">
                  <DeleteOutlined className={styles.icon} />
                </Popconfirm>
              )}
            </>
          )
        }
        if (row.children) {
          obj.children = generalData(row.children)
        }
        return obj
      })
    },
    getPrivilegesData() {
      getPrivileges(res => {
        setIsLoad(true)
        return setData(res.data)
      })
    }
  })
  React.useEffect(() => {
    getPrivilegesData()
  }, []) // eslint-disable-line
  const treeData = React.useMemo(() => {
    return generalData(data)
  }, [data]) // eslint-disable-line
  const handleOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then((values: PrivilegesData) => {
        console.log(values)
        setTimeout(() => {
          setOpen(false)
          setConfirmLoading(false)
        }, 2000)
      })
      .catch(() => {
        setConfirmLoading(false)
        return
      })
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.privileges}>
      <View title="权限管理" margin={false} />
      <View>
        <div className={styles.control}>
          <Button
            type="primary"
            onClick={() => {
              form.resetFields()
              setOpen(true)
            }}>
            新增权限
          </Button>
        </div>
        {isLoad && (
          <Tree
            showLine={true}
            defaultExpandedKeys={[]}
            treeData={treeData}
            defaultExpandAll
          />
        )}
      </View>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <Form
          name="添加权限"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="权限名称"
            name="name"
            rules={[{ required: true, message: '请输入权限名称!' }]}>
            <Input placeholder="请输入权限名称" />
          </Form.Item>
          <Form.Item
            label="上级权限"
            name="pid"
            rules={[{ required: true, message: '请选择上级权限！' }]}>
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              fieldNames={{
                value: 'key'
              }}
              treeData={data}
              placeholder="请选择上级权限"
              treeDefaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Privileges
