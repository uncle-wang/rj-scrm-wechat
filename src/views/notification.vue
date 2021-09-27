<template>
  <div class="page-notification">
    <rj-card border>
      管理员刘雨辰创建了推送任务，提醒你给已添加企业微信00时05分的新客户发送消息
    </rj-card>
    <rj-title>推送详情</rj-title>
    <rj-card>
      <i class="el-icon-message-solid primary-text"></i>
      管理员提醒你在<span class="primary-text">「2021-08-12 21:04」</span>给以下客户发送消息
    </rj-card>
    <rj-message-preview :contents="contents" title="推送内容"></rj-message-preview>
    <el-card header="选择客户进行任务跟进">
      <div v-for="(item,index) in customers" :key="index" class="customer-item">
        <div class="customer-box">
          <div class="customer-avatar"></div>
          <div class="customer-content">
            <div>夏夏 <span class="text-wechat">@微信</span></div>
            <div class="customer-time">
              添加时间：<strong>2021-08-12 21:04</strong>
            </div>
          </div>
        </div>
        <el-button type="primary" plain @click="openUserProfile">跟进</el-button>
      </div>
    </el-card>
    <div class="no-more">没有更多用户了～</div>
  </div>
</template>

<script>
import getParam from '@/utils/getParam';

export default {
  data() {
    return {
      customers: [{}, {}],
      contents: [
        {
          msgtype: 'text',
          text: { content: '客户您好' },
        },
        {
          msgtype: 'image',
          image: { pic_url: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg' },
        },
        {
          msgtype: 'link',
          link: { title: '点击查看详情', url: 'https://www.baidu.com' },
        },
        {
          msgtype: 'file',
          file: { name: '工程规划.pdf' },
        },
        {
          msgtype: 'miniprogram',
          miniprogram: {
            appid: 'wx8bd80126147df384',
            title: '腾讯云助手',
            imgUrl: 'https://search-operate.cdn.bcebos.com/d054b8892a7ab572cb296d62ec7f97b6.png',
            page: '/index/page.html',
          },
        },
        {
          msgtype: 'image',
          image: { pic_url: 'https://img0.baidu.com/it/u=3237371273,3131709842&fm=26&fmt=auto&gp=0.jpg' },
        },
      ],
      tasks: [],
      ruleInfo: {},
    };
  },
  methods: {
    openUserProfile() {
      this.$wxInvoke('openUserProfile', {
        type: 2,
        userid: 'wmah6MDAAApKcwOT7iRT78qFTDusKbQg',
      }).catch(err => {
        console.error(err);
      });
    },
  },
  created() {
    const taskId = getParam('task_id');
    if (!taskId) return;
    const p1 = this.$request({
      method: 'POST',
      url: `/api/task/info/${taskId}`
    });
    const p2 = this.$request({
      url: `/api/task/rule/${taskId}`
    });
    Promise.all([p1, p2]).then(([tasks, ruleInfo]) => {
      this.tasks = tasks;
      this.ruleInfo = ruleInfo;
    }).catch(() => {});
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
.primary-text {
  color: @c_primary;
}
.el-icon-message-solid {
  font-size: 16px;
  position: relative;
  top: 1px;
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
  background-image: url(~@/assets/avatar.jpg);
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
.no-more {
  font-size: 12px;
  color: @c_regular_b;
  text-align: center;
}
</style>
