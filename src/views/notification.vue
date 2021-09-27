<template>
  <div class="page-notification">
    <template v-if="tasks.length<=0">
      <div class="empty">暂无内容</div>
    </template>
    <template v-else>
      <rj-card border>
        首旅如家 提醒您给【离店{{ruleInfo.triggerCondition}}天】的用户发送【{{ruleInfo.taskName}}】信息
      </rj-card>
      <rj-message-preview :contents="contents" title="推送内容"></rj-message-preview>
      <el-card header="选择客户进行任务跟进">
        <div v-for="(item,index) in customers" :key="index" class="customer-item">
          <div class="customer-box">
            <div class="customer-avatar" :style="{backgroundImage:`url(${item.avatar})`}"></div>
            <div class="customer-content">
              <div>{{item.name}} <span class="text-wechat">@微信</span></div>
              <div class="customer-time">
                添加时间：<strong>{{item.createtime}}</strong>
              </div>
            </div>
          </div>
          <el-button type="primary" plain @click="openUserProfile(item.receiveUserId)">跟进</el-button>
        </div>
      </el-card>
      <div class="total">总客户数:{{customers.length}}人</div>
    </template>
  </div>
</template>

<script>
import getParam from '@/utils/getParam';
import { MSGTYPE } from '@/constants';
import { getTaskDetail, getTaskRule } from '@/api/common';

export default {
  data() {
    return {
      tasks: [],
      ruleInfo: {
        taskName: '',
        triggerCondition: 0,
      },
    };
  },
  methods: {
    openUserProfile(userid) {
      this.$wxInvoke('openUserProfile', {
        type: 2,
        userid,
      }).catch(err => {
        console.error(err);
      });
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
    customers() {
      return this.tasks.map((item) => item.receiveUserInfo);
    },
  },
  created() {
    const taskId = getParam('task_id');
    if (!taskId) return;
    const loading = this.$loading();
    Promise.all([getTaskDetail(taskId), getTaskRule(taskId)]).then(([tasks, ruleInfo]) => {
      this.tasks = tasks;
      this.ruleInfo.taskName = ruleInfo.taskName;
      this.ruleInfo.triggerCondition = ruleInfo.triggerCondition;
      loading.close();
    }).catch(() => {
      loading.close();
    });
  },
};
</script>

<style scoped lang="less">
.page-notification {
  padding: 18px 12px;
  &>*:nth-child(n+2) {
    margin-top: 16px;
  }
}
.empty {
  color: #aeaeae;
  text-align: center;
  padding: 160px 0;
}
.rj-message-preview {
  width: 300px;
  height: 468px;
  margin-left: auto;
  margin-right: auto;
}
.customer-item {
  display: flex;
  align-items: center;
  &+.customer-item {
    margin-top: 12px;
  }
  .el-button {
    margin-left: 12px;
  }
}
.customer-box {
  flex: 1;
  display: flex;
  align-items: center;
}
.customer-avatar {
  width: 42px;
  flex: 0 0 42px;
  height: 42px;
  background-size: cover;
  background-position: center;
  background-color: #efefef;
}
.customer-content {
  flex: 1;
  color: @c_regular_a;
  font-size: 12px;
  margin-left: 10px;
}
.text-wechat {
  color: #4caf50;
}
.customer-time {
  margin-top: 2px;
}
.total {
  font-size: 12px;
  color: @c_regular_b;
  text-align: center;
}
</style>
