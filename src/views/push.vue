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

export default {
  data() {
    return {
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
          msgtype: 'text',
          text: { content: '客户您好2' },
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
    };
  },
  methods: {
    sendMessage() {
      this.contents.filter((item) => item.msgtype === MSGTYPE.TEXT).forEach((item) => {
        this.$wxInvoke('sendChatMessage', { ...item, text: { content: item.text.content + '\n' } }).then(() => {
          console.log('send ok');
        }).catch((err) => {
          console.error(err);
        });
      });
    },
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
