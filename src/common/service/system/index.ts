import { Callback, post } from '@utils/request'
import { RoleData } from '@apps/management/system/role'

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

export const getRoleList = (
  params: RoleListParams,
  success: Callback<ResRoleList>
) => {
  post('/api/system/getRoleList', params, success)
}
