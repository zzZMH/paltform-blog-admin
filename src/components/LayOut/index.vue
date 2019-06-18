<template>
  <div class="app-wrap" :class="{'sidebar-closed': !sidebarState}">
    <!-- 小屏幕侧边栏蒙板 -->
    <div v-if="deviceType === 'mobile' && sidebarState" class="wrap-bg" @click="wrapBgOutClick"></div>
    <!-- 左侧侧边栏 -->
    <div class="sidebar">
      <div class="logo-title">
        <transition name="logo-title-chg">
          <router-link v-if="sidebarState" key="open" to="/">
            <h3 class="title">{{title}}</h3>
          </router-link>
          <router-link v-else key="close" to="/">
            <img class="logo" src="../../assets/logo.png">
          </router-link>
        </transition>
      </div>
      <!-- 侧边单行栏 -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :default-active="this.$route.path" :collapse="!sidebarState" :background-color="globalCss.menuBgColor" :text-color="globalCss.menuTextColor"
          :collapse-transition="false" mode="vertical" :unique-opened="false">
          <SideMenu v-for="route in routes" :key="route.path" :item="route" :basePath="route.path"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右侧正文内容 -->
    <div class="layout">
      <!-- 顶部工具栏 -->
      <div class="header">
        <div class="navbar">
          <div class="toggle-trans">
            <img src="../../assets/toleft.png" class="icon-trans" :class="{'actived': !sidebarState}" @click="transToggleClick">
          </div>
          <div class="local-list">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-cont">
              <transition-group name="local-list-chg">
                <el-breadcrumb-item v-for="(item,index) in localList" :key="item.path">
                  <span v-if="item.redirect === 'noRedirect' || index == localList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
                  <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>
          </div>
        </div>
      </div>
      <!-- 单页面路由切换输出 -->
      <div class="main">
        <div class="cont">
          <transition name="cont-chg" mode="out-in">
            <router-view :key="this.$route.fullPath"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalCss from '../../styles/global.scss'
import SideMenu from '../../components/SideMenu'

export default {
  data () {
    return {
      localList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    if (this.isMobile()) {
      this.$store.dispatch('toggleDevice', 'mobile')
      this.$store.dispatch('closeSideBar')
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  components: {
    SideMenu
  },
  computed: {
    title () {
      return this.$store.state.app.title
    },
    sidebarState () {
      return this.$store.state.app.sidebarState
    },
    deviceType () {
      return this.$store.state.app.deviceType
    },
    globalCss () {
      return globalCss
    },
    routes () {
      return this.$router.options.routes
    }
  },
  watch: {
    '$route': 'routeChangeHandler'
  },
  methods: {
    routeChangeHandler () {
      if (this.deviceType === 'mobile' && this.sidebarState) {
        this.$store.dispatch('closeSidebar')
      }
      this.getBreadcrumb()
    },
    isMobile () {
      const curDocWidth = document.body.getBoundingClientRect().width - 1
      return curDocWidth < this.$store.state.app.mobileWidth
    },
    resizeHandler () {
      if (this.isMobile()) {
        this.$store.dispatch('toggleDevice', 'mobile')
        this.$store.dispatch('closeSideBar')
      } else {
        this.$store.dispatch('toggleDevice', 'desktop')
      }
    },
    wrapBgOutClick () {
      this.$store.dispatch('closeSideBar')
    },
    transToggleClick () {
      this.$store.dispatch('toggleSideBar')
    },
    getBreadcrumb () {
      let routeArr = this.$route.matched.filter(item => item.meta && item.meta.title)
      let firstRoute = routeArr[0]
      if (!this.isHomeRoute(firstRoute)) {
        routeArr = [{ path: '/', meta: { title: '首页' } }].concat(routeArr)
      }
      this.localList = routeArr.filter(item => item.meta && item.meta.title)
    },
    isHomeRoute (route) {
      const routeName = route && route.name
      if (!routeName) {
        return false
      }
      return (routeName !== '' && routeName.trim() === '首页')
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/global.scss";

#app {
  height: 100%;
  .app-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    &::after {
      content: "";
      clear: both;
    }
    .wrap-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      opacity: 0.5;
      background-color: #000;
      z-index: 999;
    }
    .sidebar {
      position: fixed;
      width: $sideBarWidth !important;
      height: 100%;
      transition: width 0.3s;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: $menuBgColor;
      z-index: 1000;
      overflow: hidden;
      .logo-title {
        position: relative;
        width: $sideBarWidth !important;
        height: 50px;
        text-align: center;
        background-color: #2b2f3a;
        transition: width 0.3s;
        .logo-title-chg-enter-active {
          transition: opacity 1s;
        }
        .logo-title-chg-enter, .logo-title-chg-leave-to {
          opacity: 0;
        }
        .title {
          display: inline-block;
          color: #fff;
          font-size: 16px;
        }
        .logo {
          width: 50px;
          height: 50px;
        }
      }
      .el-scrollbar {
        height: calc(100% - 50px);
      }
    }
    .layout {
      position: relative;
      min-height: 100%;
      margin-left: $sideBarWidth;
      transition: margin-left 0.3s;
      transition: width 0.3s;
      .header {
        position: fixed;
        width: calc(100% - #{$sideBarWidth});
        top: 0;
        right: 0;
        border-bottom: 1px solid #e6e6e6;
        transition: width 0.3s;
        z-index: 99;
        .navbar {
          height: 49px;
          background-color: #fff;
          .toggle-trans {
            float: left;
            height: 49px;
            .icon-trans {
              width: 17px;
              height: 17px;
              margin: 16px;
              cursor: pointer;
            }
            .actived {
              transform: rotate(180deg);
            }
          }
          .local-list {
            float: left;
            height: 49px;
            .breadcrumb-cont {
              display: inline-block;
              font-size: 14px;
              line-height: 49px;
              .local-list-chg-enter-active, .local-list-chg-leave-active {
                transition: all .5s;
              }
              .local-list-chg-enter, .local-list-chg-leave-active {
                opacity: 0;
                transform: translateX(20px);
              }
              .local-list-chg-move {
                transition: all .5s;
              }
              .local-list-chg-leave-active {
                position: absolute;
              }
              .no-redirect {
                color: #97a8be;
                cursor: text;
              }
            }
          }
        }
      }
      .main {
        width: 100%;
        min-height: calc(100% - 50px);
        position: relative;
        padding-top: 50px;
        overflow: hidden;
        .cont {
          padding: 20px;
        }
      }
    }
  }
  .sidebar-closed {
    .sidebar {
      width: $sideBarClosedWidth !important;
      transition: width 0.3s;
      .logo-title {
        width: $sideBarClosedWidth !important;
      }
      .el-scrollbar {
        height: calc(100% - 50px);
      }
      .el-submenu__title span, .el-submenu__title .el-submenu__icon-arrow {
        display: none;
      }
    }
    .layout {
      width: calc(100% - #{$sideBarClosedWidth});
      margin-left: $sideBarClosedWidth;
      transition: width 0.3s;
      .header {
        width: calc(100% - #{$sideBarClosedWidth});
        transition: width 0.3s;
      }
    }
  }
}
</style>
