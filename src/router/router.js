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
  name: '首页',
  component: Layout,
  redirect: '/home',
  meta: { icon: 'el-icon-s-home', roles: ['user', 'visitor'] },
  children: [{
    path: 'home',
    name: '首页',
    component: () => import('../views/Home.vue'),
    meta: { icon: 'el-icon-s-home', roles: ['user', 'visitor'] }
  }]
}, {
  path: '/about',
  name: '关于',
  component: Layout,
  redirect: '/about/introduce',
  meta: { icon: 'el-icon-paperclip', roles: ['user'] },
  children: [{
    path: 'introduce',
    name: '简介',
    component: () => import('../views/About.vue'),
    meta: { icon: 'el-icon-s-comment', roles: ['user'] }
  }, {
    path: 'login',
    name: '登录',
    component: () => import('../views/Login.vue'),
    meta: { icon: 'el-icon-s-custom' }
  }]
}, {
  path: 'a',
  name: '文章管理',
  meta: { icon: 'el-icon-s-custom', roles: ['user'] },
  children: []
}, {
  path: 'b',
  name: '审核管理',
  meta: { icon: 'el-icon-s-custom' },
  children: []
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
