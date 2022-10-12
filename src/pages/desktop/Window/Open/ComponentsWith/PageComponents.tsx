import React from 'react'
import Userinfo from '@apps/management/user/userinfo'
import BackgroundSet from '@apps/management/system/background-set'

export type PageComponentName = 'userinfo' | 'backgroundSet'

const PageComponents: Record<PageComponentName, React.ComponentType> = {
  userinfo: Userinfo,
  backgroundSet: BackgroundSet
}

export default PageComponents
