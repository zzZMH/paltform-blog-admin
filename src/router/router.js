import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(Router)

// 进度条配置: 不显示右侧环形loading
nprogress.configure({
  showSpinner: false
})

const constRouters = [{
  path: '/',
  name: 'home',
  component: () => import('../views/Home.vue')
}, {
  path: '/about',
  name: 'about',
  component: () => import('../views/About.vue')
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRouters
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  console.log(to.path)
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
