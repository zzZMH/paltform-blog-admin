import mock from 'mockjs'
import user from './user'
import route from './route'

const userData = { ...user }

const getUserList = mock.mock('/user/getUserList', 'get', () => {
  return {
    code: '2000',
    data: userData.dataUserList.items,
    msg: '查询成功！'
  }
})

const routeData = { ...route }

const getRouteList = mock.mock('/user/getRouteList', 'get', () => {
  return {
    code: '2000',
    data: routeData.dataRouteList,
    msg: '查询成功！'
  }
})

const mockApi = {
  getUserList,
  getRouteList
}

export default mockApi
