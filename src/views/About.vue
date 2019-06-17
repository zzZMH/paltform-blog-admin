<template>
  <div class="editor">
    <mavon-editor style="height: 100%;" :ishljs="true"></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
