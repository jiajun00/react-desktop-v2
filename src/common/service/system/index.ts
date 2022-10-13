import { Callback, post } from '@utils/request'
import { RoleData } from '@apps/management/system/role'

export interface ResRoleList {
  data: {
    list: RoleData[]
  }
  code: number
}

export const getRoleList = (success: Callback<ResRoleList>) => {
  post('/api/system/getRoleList', {}, success)
}
