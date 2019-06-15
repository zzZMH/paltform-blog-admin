import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Layout from '../components/LayOut/index'

Vue.use(Router)

// 进度条配置: 不显示右侧环形loading
nprogress.configure({
  showSpinner: false
})

const constRouters = [{
  path: '/',
  name: '首页',
  component: Layout,
  redirect: '/home',
  children: [{
    path: 'home',
    name: '首页',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', icon: 'el-icon-s-home' }
  }]
}, {
  path: '/about',
  name: '关于',
  component: Layout,
  redirect: '/about/introduce',
  meta: { title: '关于', icon: 'dashboard' },
  children: [{
    path: 'introduce',
    name: '简介',
    component: () => import('../views/About.vue'),
    meta: { title: '简介', icon: 'dashboard' }
  }, {
    path: 'login',
    name: '登录',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录', icon: 'dashboard' }
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
