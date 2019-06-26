const dataRouteList = [{
  path: '*',
  redirect: '/404',
  hidden: true
}, {
  path: '/404',
  hidden: true
}, {
  path: '/login',
  hidden: true
}, {
  path: '/',
  redirect: '/home',
  children: [{
    path: 'home',
    name: '首页',
    meta: { title: '首页', icon: 'el-icon-s-home', roles: ['user', 'visitor'] }
  }]
}, {
  path: '/user',
  redirect: '/user/userList',
  name: '用户管理',
  meta: { title: '用户管理', icon: 'el-icon-s-comment' },
  children: [{
    path: 'userList',
    name: '用户列表',
    meta: { title: '用户列表', icon: 'el-icon-s-comment' }
  }, {
    path: 'createUser',
    name: '添加用户',
    meta: { title: '添加用户', icon: 'el-icon-s-custom' }
  }]
}, {
  path: '/article',
  redirect: '/article/articleList',
  name: '文章管理',
  meta: { title: '文章管理', icon: 'el-icon-s-comment', roles: ['user', 'visitor'] },
  children: [{
    path: 'articleList',
    name: '文章列表',
    meta: { title: '文章列表', icon: 'el-icon-s-home', roles: ['user', 'visitor'] }
  }, {
    path: 'carticleType',
    name: '文章分类',
    meta: { title: '文章分类', icon: 'el-icon-s-home', roles: ['user'] }
  }, {
    path: 'createArticle',
    name: '添加文章',
    meta: { title: '添加文章', icon: 'el-icon-s-home', roles: ['user'] }
  }]
}, {
  path: '/audit',
  redirect: '/audit/auditList',
  name: '审核管理',
  meta: { title: '审核管理', icon: 'el-icon-s-comment' },
  children: [{
    path: 'auditList',
    name: '审核列表',
    meta: { title: '审核列表', icon: 'el-icon-s-home' }
  }, {
    path: 'auditRecode',
    name: '审核记录',
    meta: { title: '审核记录', icon: 'el-icon-s-home' }
  }]
}]

const routeData = {
  dataRouteList
}

export default routeData
