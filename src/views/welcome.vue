<template>
  <div>
    <rj-header>欢迎语设置</rj-header>
    <div class="page-welcome">
      <el-empty v-if="contents.length<=0"></el-empty>
      <rj-message-preview v-else title="欢迎语预览" :contents="contents"></rj-message-preview>
      <div class="func-btn">
        <el-button v-if="contents.length>0" type="primary" @click="$router.push('welcome_edit')">编辑</el-button>
        <el-button v-else type="primary" @click="$router.push('welcome_edit')">新建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getWelcomeList } from '@/api/common';

export default {
  data() {
    return {
      contents: [],
    };
  },
  created() {
    const loading = this.$loading();
    getWelcomeList().then((data) => {
      this.contents = data;
      loading.close();
    }).catch(() => {
      loading.close();
    });
  },
};
</script>

<style scoped lang="less">
.page-welcome {
  padding: 18px 12px;
}
.rj-message-preview {
  width: 300px;
  height: 488px;
  margin: 0 auto;
}
.func-btn {
  text-align: center;
  margin-top: 18px;
  .el-button {
    width: 100px;
  }
}
</style>
