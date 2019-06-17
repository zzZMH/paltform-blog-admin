<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOnlyOneChild(item, item.children)">
      <router-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta && onlyOneChild.meta.icon"></i>
          <span slot="title">{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i :class="item.meta && item.meta.icon"></i>
        <span slot="title">{{ item.meta && item.meta.title }}</span>
      </template>
      <SideMenu class="nest-menu" v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)"/>
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
