<template>
  <div class="editor">
    <mavon-editor style="height: 100%;" :ishljs="ishljs" :codeStyle="codeStyle" :scrollStyle="true"></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      ishljs: true,
      codeStyle: 'monokai'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

.editor {
  position: fixed;
  width: calc(100% - #{$sideBarWidth} - 40px);
  height: calc(100% - 50px - 40px);
  min-height: calc(100% - 50px - 40px);
}
.sidebar-closed {
  .editor {
    position: fixed;
    width: calc(100% - #{$sideBarClosedWidth} - 40px);
    height: calc(100% - 50px - 40px);
    min-height: calc(100% - 50px - 40px);
  }
}
</style>
