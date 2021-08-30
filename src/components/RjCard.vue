<template>
  <div class="card" :class="{border}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.card {
  font-size: 13px;
  padding: 12px;
  color: @c_regular_a;
  background-color: @c_bg;
  &.border {
    border: 1px solid @c_border;
  }
}
</style>
