<template>
  <div v-if="!item.hidden && (userRole === 'admin' || item.meta && item.meta.roles && item.meta.roles.indexOf(userRole) >= 0)" class="menu-wrapper">
    <template v-if="hasOnlyOneChild(item, item.children)">
      <router-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon"></i>
          <span slot="title">{{ onlyOneChild.name }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </template>
      <SideMenu class="nest-menu" v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)" :userRole="userRole"/>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SideMenu',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true,
      default: ''
    },
    userRole: {
      type: String,
      required: true,
      default: 'visitor'
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOnlyOneChild (parent, children = []) {
      // 遍历需要展示的节点
      const childArr = children.filter((child) => {
        if (child.hidden) {
          return false
        } else {
          this.onlyOneChild = child
          return true
        }
      })
      // 判断是否为单个子节点
      if (childArr.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: ''
        }
        return true
      }
      if (childArr.length === 1) {
        // 判断该单个子节点是否有子节点
        if (childArr[0].children) {
          return false
        } else {
          return true
        }
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
