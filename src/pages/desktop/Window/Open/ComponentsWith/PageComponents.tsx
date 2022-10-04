import React from 'react'
import Userinfo from '@apps/management/user/userinfo'

export type PageComponentName = 'userinfo'

const PageComponents: Record<PageComponentName, React.ComponentType> = {
  userinfo: Userinfo
}

export default PageComponents
