<template>
  <div>
    <rj-header>欢迎语设置</rj-header>
    <div class="page-welcome">
      <rj-message-preview title="欢迎语预览" :contents="contents"></rj-message-preview>
      <div class="func-btn">
        <el-button type="primary" @click="$router.push('welcome_edit')">编辑</el-button>
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
    getWelcomeList();
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
