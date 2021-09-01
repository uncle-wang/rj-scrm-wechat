<template>
  <div>
    <rj-header>
      <div class="header">
        <span>【离店问卷推送】信息</span>
        <span>2021-09-01</span>
      </div>
    </rj-header>
    <div class="page-push">
      <rj-message-preview title="信息预览" :contents="contents"></rj-message-preview>
      <div class="func-btn">
        <el-button type="primary">立即推送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
          msgtype: 'link',
          link: { title: '点击查看详情', url: 'https://www.baidu.com' },
        },
        {
          msgtype: 'file',
          file: { name: '工程规划.pdf' },
        },
        {
          msgtype: 'miniprogram',
          miniprogram: { title: '腾讯云助手' },
        },
        {
          msgtype: 'image',
          image: { pic_url: 'https://img0.baidu.com/it/u=3237371273,3131709842&fm=26&fmt=auto&gp=0.jpg' },
        },
      ],
    };
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
}
</style>
