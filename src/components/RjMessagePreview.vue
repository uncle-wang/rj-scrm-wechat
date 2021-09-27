<template>
  <div class="rj-message-preview">
    <div class="wechat-box">
      <div class="wechat-header">{{title}}</div>
      <div class="wechat-body">
        <div v-for="(item,index) in contents" :key="index" class="message-box">
          <div class="avatar">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="message-content">
            <!-- 文字 -->
            <div v-if="item.extType===MSGTYPE.TEXT" class="message-text">
              {{item.textContent}}
            </div>
            <!-- 链接 -->
            <div v-else-if="item.extType===MSGTYPE.LINK" class="message-text">
              <el-link type="primary" :href="item.linkUrl" :underline="false" target="_blank">
                {{item.linkTitle}}
              </el-link>
            </div>
            <!-- 图片 -->
            <div v-else-if="item.extType===MSGTYPE.IMAGE" class="message-image">
              <img class="image" :src="getMediaUrl(item.imageMediaId)">
            </div>
            <!-- 小程序 -->
            <div v-else-if="item.extType===MSGTYPE.MINIPROGRAM" class="message-text">
              [小程序]{{item.miniTitle}}
            </div>
            <!-- 其他文件 -->
            <div v-else class="message-text">
              [文件]{{item.fileMediaId}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MSGTYPE } from '@/constants';
import { getMediaUrl } from '@/api/common';

export default {
  name: 'RjMessagePreview',
  props: {
    title: {
      type: String,
      required: false,
      default: '内容预览',
    },
    contents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { MSGTYPE };
  },
  methods: {
    getMediaUrl,
  },
};
</script>

<style scoped lang="less">
.wechat-box {
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.wechat-header {
  background-color: #4775c0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.wechat-body {
  background-color: #eceff1;
  box-sizing: border-box;
  padding: 32px 16px;
  overflow-y: auto;
  flex: 1;
}
.message-box {
  display: flex;
  &+.message-box {
    margin-top: 12px;
  }
}
.avatar {
  background-color: rgb(215,222,230);
  flex: 0 0 32px;
  height: 32px;
  color: #fff;
  border-radius: 4px;
  font-size: 28px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.message-content {
  flex: 1;
  overflow: hidden;
  padding-left: 10px;
  display: flex;
}
.message-text {
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  max-width: 156px;
  font-size: 12px;
  position: relative;
  box-sizing: border-box;
  word-break: break-word;
  &:before {
    content: ' ';
    border-width: 5px;
    border-style: solid;
    border-color: transparent #FFF transparent transparent;
    position: absolute;
    left: -10px;
  }
  .el-link {
    font-size: 12px;
  }
}
.message-image {
  img {
    display: block;
    max-width: 156px;
    max-height: 120px;
    border-radius: 5px;
  }
}
</style>
