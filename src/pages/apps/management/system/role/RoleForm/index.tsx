import React, { useImperativeHandle } from 'react'
import { Form, Input, message, Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import styles from './index.module.scss'
import { PrivilegesData } from '@apps/management/system/privileges'
import { getPrivileges } from '@/common/service/system'

interface Props {
  initialValues?: any
  onRef?: React.MutableRefObject<OnRef | undefined>
}

export interface OnRef {
  submit: { (callBack: { (values: RoleFormValues): void }): void }
}

export interface RoleFormValues {
  id: string
  roleName: string
  privileges: number[]
}

const RoleForm: React.FC<Props> = ({ initialValues, onRef }) => {
  const [privileges, setPrivileges] = React.useState<PrivilegesData[]>([])
  const [isLoad, setIsLoad] = React.useState<boolean>(false)
  const [selectPrivileges, setSelectPrivileges] = React.useState<number[]>(
    initialValues?.privileges || []
  )
  const [form] = Form.useForm()
  useImperativeHandle(onRef, () => ({
    submit(callback) {
      form
        .validateFields()
        .then(values => {
          if (selectPrivileges.length === 0) {
            message.error('请选择权限！').then(r => r)
            return
          }
          callback({
            ...values,
            privileges: selectPrivileges
          } as RoleFormValues)
        })
        .catch(error => console.log(error))
    }
  }))

  const onCheck: TreeProps['onCheck'] = checkedKeys => {
    setSelectPrivileges(checkedKeys as number[])
  }
  React.useEffect(() => {
    getPrivileges(res => {
      setIsLoad(true)
      return setPrivileges(res.data)
    })
  }, [])

  return (
    <div className={styles.form}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        autoComplete="off">
        <Form.Item
          label="角色名"
          name="roleName"
          rules={[{ required: true, message: '请输入角色名!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="权限">
          {isLoad && (
            <Tree
              checkable
              checkedKeys={selectPrivileges}
              onCheck={onCheck}
              treeData={privileges}
              defaultExpandAll
            />
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default RoleForm
