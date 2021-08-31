<template>
  <div class="page-notification">
    <rj-card border>
      管理员刘雨辰创建了个人SOP任务，提醒你给已添加企业微信00时05分的新客户发送消息
    </rj-card>
    <rj-title>推送详情</rj-title>
    <rj-card>
      <i class="el-icon-message-solid primary-text"></i>
      管理员提醒你在<span class="primary-text">「2021-08-12 21:04」</span>给以下客户发送消息
    </rj-card>
    <el-card header="推送内容">
      <div v-for="(item,index) in pushes" :key="index" class="push-item">
        <el-input value="测试推送内容" size="medium" readonly></el-input>
        <el-button type="primary" plain>复制</el-button>
      </div>
    </el-card>
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
        <el-button type="primary" plain @click="test">跟进</el-button>
      </div>
    </el-card>
    <div class="no-more">没有更多用户了～</div>
  </div>
</template>

<script>
import { WECHATPAGE } from '@/constants';
export default {
  data() {
    return {
      customers: [{}, {}],
      pushes: [{}, {}],
    };
  },
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
.push-item {
  display: flex;
  align-items: center;
  &+.push-item {
    margin-top: 12px;
  }
  .el-input {
    flex: 1;
  }
  .el-button {
    margin-left: 12px;
  }
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
