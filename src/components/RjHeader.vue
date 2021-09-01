<template>
  <div class="rj-header">
    <div class="rj-header-title">
      <slot></slot>
    </div>
    <el-button v-if="showBack" type="primary" plain @click="$router.back()">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'RjHeader',
  props: {
    showBack: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.rj-header {
  height: 54px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 3px #dadada;
  padding: 0 12px;
  justify-content: space-between;
}
.rj-header-title {
  flex: 1;
  font-size: 14px;
  color: @c_regular_a;
}
</style>
