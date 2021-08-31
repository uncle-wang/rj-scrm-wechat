<template>
  <div class="rj-header">
    <div class="rj-header-title">
      <slot></slot>
    </div>
    <el-button type="primary" plain @click="$router.back()">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'RjHeader'
};
</script>

<style scoped lang="less">
.rj-header {
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 3px #dadada;
  padding: 10px 12px;
  justify-content: space-between;
}
.rj-header-title {
  font-size: 14px;
  color: @c_regular_a;
}
</style>
