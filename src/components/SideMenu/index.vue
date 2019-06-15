<template>
  <div v-if="!item.hidden">
      <template v-if="hasOnlyOneChild(item, item.children)">
        <router-link :to="'/'+onlyOneChild.path">
          <el-menu-item :index="onlyOneChild.path">
            <i :class="onlyOneChild.meta.icon"></i>
            <span slot="title">{{ onlyOneChild.name }}</span>
          </el-menu-item>
        </router-link>
      </template>

      <template v-else>

      </template>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    item: {
      type: Object,
      required: true
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
          name: '--',
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
    }
  }
}
</script>
