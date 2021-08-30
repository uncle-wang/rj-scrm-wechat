<template>
  <div class="rj-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RjTitle',
};
</script>

<style scoped lang="less">
.rj-title {
  padding: 0 8px;
  line-height: 18px;
  font-weight: bold;
  border-left: 4px solid @c_primary;
}
</style>
