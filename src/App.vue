<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  width: 360px;
  min-height: 720px;
  background-color: #fff;
  margin: 0 auto;
}
</style>

<script>
export default {
  mounted() {
    this.$el.style.minHeight = window.innerHeight + 'px';
  },
};
</script>
