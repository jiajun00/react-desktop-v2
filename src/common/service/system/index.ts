import { Callback, post } from '@utils/request'
import { RoleData } from '@apps/management/system/role'
import { PrivilegesData } from '@apps/management/system/privileges'

export interface RoleListData {
  current: number
  totalPage: number
  total: number
  list: RoleData[]
}

export interface ResRoleList {
  data: RoleListData
  code: number
}

export interface RoleListParams {
  roleName: string
}

export interface ResPrivileges {
  data: PrivilegesData[]
  code: number
}

export const getPrivileges = (success: Callback<ResPrivileges>) => {
  post('/api/system/getPrivileges', {}, success)
}

export const getRoleList = (
  params: RoleListParams,
  success: Callback<ResRoleList>
) => {
  post('/api/system/getRoleList', params, success)
}
