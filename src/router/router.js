import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '../components/LayOut/index'

Vue.use(Router)

// 进度条配置: 不显示右侧环形loading
nprogress.configure({
  showSpinner: false
})

const constRouters = [{
  path: '*',
  redirect: '/404',
  hidden: true
}, {
  path: '/404',
  component: () => import('../views/404.vue'),
  hidden: true
}, {
  path: '/login',
  component: () => import('../views/Login.vue'),
  hidden: true
}, {
  path: '/',
  redirect: '/home',
  component: Layout,
  children: [{
    path: 'home',
    name: '首页',
    meta: { title: '首页', icon: 'el-icon-s-home', roles: ['user', 'visitor'] },
    component: () => import('../views/Home.vue')
  }]
}, {
  path: '/user',
  redirect: '/user/userList',
  name: '用户管理',
  meta: { title: '用户管理', icon: 'el-icon-s-comment' },
  component: Layout,
  children: [{
    path: 'userList',
    name: '用户列表',
    meta: { title: '用户列表', icon: 'el-icon-s-comment' },
    component: () => import('../views/About.vue')
  }, {
    path: 'createUser',
    name: '添加用户',
    meta: { title: '添加用户', icon: 'el-icon-s-custom' },
    component: () => import('../views/Login.vue')
  }]
}, {
  path: '/article',
  redirect: '/article/articleList',
  name: '文章管理',
  meta: { title: '文章管理', icon: 'el-icon-s-comment', roles: ['user', 'visitor'] },
  component: Layout,
  children: [{
    path: 'articleList',
    name: '文章列表',
    meta: { title: '文章列表', icon: 'el-icon-s-home', roles: ['user', 'visitor'] },
    component: () => import('../views/Login.vue')
  }, {
    path: 'carticleType',
    name: '文章分类',
    meta: { title: '文章分类', icon: 'el-icon-s-home', roles: ['user'] },
    component: () => import('../views/Login.vue')
  }, {
    path: 'createArticle',
    name: '添加文章',
    meta: { title: '添加文章', icon: 'el-icon-s-home', roles: ['user'] },
    component: () => import('../views/Login.vue')
  }]
}, {
  path: '/audit',
  component: Layout,
  redirect: '/audit/auditList',
  name: '审核管理',
  meta: { title: '审核管理', icon: 'el-icon-s-comment' },
  children: [{
    path: 'auditList',
    name: '审核列表',
    meta: { title: '审核列表', icon: 'el-icon-s-home' },
    component: () => import('../views/Login.vue')
  }, {
    path: 'auditRecode',
    name: '审核记录',
    meta: { title: '审核记录', icon: 'el-icon-s-home' },
    component: () => import('../views/Login.vue')
  }]
}]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouters
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
