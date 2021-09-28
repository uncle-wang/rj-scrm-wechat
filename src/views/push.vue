<template>
  <div>
    <rj-header>
      <div class="header">
        <span>【离店问卷推送】信息</span>
        <span>2021-09-01</span>
      </div>
    </rj-header>
    <div class="page-push">
      <rj-message-preview title="内容预览" :contents="contents"></rj-message-preview>
      <div class="func-btn">
        <el-button type="primary" @click="sendMessage">立即推送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MSGTYPE } from '@/constants';
import { getTasksByUser } from '@/api/common';
import sendChatMessage from '@/utils/sendChatMessage';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    sendMessage() {
      sendChatMessage(this.contents);
    },
  },
  computed: {
    contents() {
      if (this.tasks.length <= 0) return [];
      const taskInfo = this.tasks[0];
      const contents = [];
      // 文本
      if (taskInfo.textContent) {
        contents.push({ extType: MSGTYPE.TEXT, textContent: taskInfo.textContent });
      }
      // 图片
      if (taskInfo.imageMediaId) {
        contents.push({ extType: MSGTYPE.IMAGE, imageMediaId: taskInfo.imageMediaId });
      }
      // 链接
      if (taskInfo.linkUrl && taskInfo.linkTitle) {
        contents.push({
          extType: MSGTYPE.LINK,
          linkUrl: taskInfo.linkUrl,
          linkTitle: taskInfo.linkTitle,
          linkDesc: taskInfo.linkDesc,
          linkPicurl: taskInfo.linkPicurl,
        });
      }
      // 文件
      if (taskInfo.fileMediaId) {
        contents.push({ extType: MSGTYPE.FILE, fileMediaId: taskInfo.fileMediaId });
      }
      // 小程序
      if (taskInfo.miniAppid && taskInfo.miniTitle && taskInfo.miniPage && taskInfo.miniPicMediaId) {
        contents.push({
          extType: MSGTYPE.MINIPROGRAM,
          miniAppid: taskInfo.miniAppid,
          miniTitle: taskInfo.miniTitle,
          miniPage: taskInfo.miniPage,
          miniPicMediaId: taskInfo.miniPicMediaId,
        });
      }
      return contents;
    },
  },
  created() {
    this.$wxInvoke('getCurExternalContact').then((res) => {
      const loading = this.$loading();
      getTasksByUser(res.userId).then((data) => {
        this.tasks = data;
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
.header {
  display: flex;
  justify-content: space-between;
}
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
