<template>
  <div class="page-push">
    <rj-card border>
      管理员刘雨辰创建了个人SOP任务，提醒你给已添加企业微信00时05分的新客户发送消息
    </rj-card>
    <el-button @click="test">点击测试</el-button>
  </div>
</template>

<script>
import { WECHATPAGE } from '@/constants';
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
  created() {
    if (this.$store.state.entry !== WECHATPAGE.SINGLECHAT) {
      return;
    }
    this.$wxInvoke('getCurExternalContact').then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  },
};
</script>

<style scoped lang="less">
.page-push {
  padding: 18px 12px;
}
</style>
