<template>
  <div>
    <el-empty v-if="tasks.length<=0"></el-empty>
    <div v-for="item in tasks" :key="item.taskId" class="page-push">
      <rj-message-preview :title="`${item.taskName}`" :contents="item.contents"></rj-message-preview>
      <div class="func-btn">
        <el-button type="primary" @click="sendMessage(item)" :disabled="item.followed">
          {{item.followed ? '已推送' : '立即推送'}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTasksByUser, updateTaskStatus } from '@/api/common';
import sendChatMessage from '@/utils/sendChatMessage';
import formatPushMessage from '@/utils/formatPushMessage';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    sendMessage(task) {
      sendChatMessage(task.contents);
      task.followed = true;
      updateTaskStatus(task.taskId, task.receiveUserInfo.receiveUserId).catch(() => {});
    },
  },
  created() {
    this.$wxInvoke('getCurExternalContact').then((res) => {
      const loading = this.$loading();
      getTasksByUser(res.userId).then((data) => {
        if (data && data.length > 0) {
          this.tasks = data.map((item) => ({
            ...item,
            followed: false,
            contents: formatPushMessage(item),
          }));
        }
        loading.close();
      }).catch(() => {
        loading.close();
      });
    }).catch((err) => {
      console.error(err);
    });
  },
};
</script>

<style scoped lang="less">
.page-push {
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
