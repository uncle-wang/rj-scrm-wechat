<template>
  <div>
    <rj-card></rj-card>
    <el-button @click="test">点击测试</el-button>
  </div>
</template>

<script>
import RjCard from '@/components/RjCard.vue';
export default {
  components: { RjCard },
  methods: {
    test() {
      this.$wxInvoke('openUserProfile', {
        type: 2,
        userid: 'wmah6MDAAApKcwOT7iRT78qFTDusKbQg',
      }).catch(err => {
        console.error(err);
      });
    },
  },
};
</script>
