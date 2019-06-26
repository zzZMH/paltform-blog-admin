import mock from 'mockjs'

const dataUserList = mock.mock({
  'items|100': [{
    userId: '@guid',
    loginName: '@word',
    userName: '@name',
    lastLoginTime: '@datetime',
    'userState|1': ['待审核', '已通过', '已废除'],
    'userOperate|1': ['审核', '废除', '修改']
  }]
})

const userData = {
  dataUserList
}

export default userData
