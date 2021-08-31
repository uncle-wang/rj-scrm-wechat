<template>
  <div class="rj-message-input">
    <div class="content-wrap">
      <div v-if="value.length<=0" class="content-empty">
        点击下方按钮添加内容
      </div>
      <div v-else class="content-box">
        <div v-for="(item,index) in value" :key="index"  class="msg-item">
          <div class="msg-item-preview">
            <!-- 文字 -->
            <div v-if="item.msgtype===MSGTYPE.TEXT" class="msg-text ellipsis">
              {{item.text.content}}
            </div>
            <!-- 链接 -->
            <div v-else-if="item.msgtype===MSGTYPE.LINK" class="msg-link">
              <el-link
                class="ellipsis"
                type="primary"
                :href="item.link.url"
                :underline="false"
                target="_blank"
              >
                {{item.link.title}}
              </el-link>
            </div>
            <!-- 小程序 -->
            <div v-else-if="item.msgtype===MSGTYPE.MINIPROGRAM" class="msg-text ellipsis">
              [小程序]{{item.miniprogram.title}}
            </div>
            <!-- 图片 -->
            <div v-else-if="item.msgtype===MSGTYPE.IMAGE" class="msg-text ellipsis">
              [图片]{{item.image.name}}
            </div>
            <!-- 文件 -->
            <div v-else class="msg-text ellipsis">
              [文件]{{item.file.name}}
            </div>
          </div>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeItem(item)"
          />
        </div>
      </div>
    </div>
    <div class="func-btns">
      <el-button
        type="primary"
        plain
        @click="showTextForm"
      >
        文字
      </el-button>
      <el-button
        type="primary"
        plain
        @click="showLinkForm"
      >
        链接
      </el-button>
      <el-button
        type="primary"
        plain
        @click="selectImage"
      >
        图片
      </el-button>
      <el-button
        type="primary"
        plain
        @click="selectFile"
      >
        文件
      </el-button>
      <el-button
        type="primary"
        plain
        @click="showMiniappForm"
      >
        小程序
      </el-button>
    </div>
    <!-- 文字表单 -->
    <rj-dialog v-if="textFormShow" title="添加文字内容" @close="textFormShow=false">
      <el-form
        :model="textForm"
        :rules="textRules"
        size="medium"
        ref="textForm"
        @submit.native.prevent="addText"
      >
        <el-form-item label="文字" prop="content">
          <el-input
            class="text-input"
            type="textarea"
            resize="none"
            placeholder="请输入内容"
            v-model="textForm.content"
            autofocus
          />
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button @click="textFormShow=false">取消</el-button>
          <el-button type="primary" native-type="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </rj-dialog>
    <!-- 链接表单 -->
    <rj-dialog v-if="linkFormShow" title="添加链接" @close="linkFormShow=false">
      <el-form
        :model="linkForm"
        :rules="linkRules"
        size="medium"
        ref="linkForm"
        @submit.native.prevent="addLink"
      >
        <el-form-item label="消息标题" prop="title">
          <el-input
            class="link-title"
            placeholder="请输入标题"
            v-model="linkForm.title"
            autofocus
          />
        </el-form-item>
        <el-form-item label="消息链接" prop="url">
          <el-input
            placeholder="请输入链接"
            v-model="linkForm.url"
          />
        </el-form-item>
        <el-form-item label="消息描述" prop="desc">
          <el-input
            placeholder="请输入描述"
            v-model="linkForm.desc"
          />
        </el-form-item>
        <el-form-item label="消息封面" prop="picurl">
          <rj-image-input v-model="linkForm.picurl"></rj-image-input>
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button @click="linkFormShow=false">取消</el-button>
          <el-button type="primary" native-type="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </rj-dialog>
    <!-- 小程序表单 -->
    <rj-dialog v-if="miniappFormShow" title="添加小程序" @close="miniappFormShow=false">
      <el-form
        :model="miniappForm"
        :rules="miniappRules"
        size="medium"
        ref="miniappForm"
        @submit.native.prevent="addMiniapp"
      >
        <el-form-item label="小程序标题" prop="title" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.title"
            autofocus
          />
        </el-form-item>
        <el-form-item label="小程序appid" prop="appid" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.appid"
            autofocus
          />
        </el-form-item>
        <el-form-item label="小程序路径" prop="page" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.page"
            autofocus
          />
        </el-form-item>
        <el-form-item label="小程序封面" prop="pic_url" required>
          <rj-image-input v-model="miniappForm.pic_url"></rj-image-input>
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button @click="miniappFormShow=false">取消</el-button>
          <el-button type="primary" native-type="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </rj-dialog>
  </div>
</template>

<script>
import { MSGTYPE } from '@/constants';
import chooseFile from '@/utils/chooseFile';
import chooseImage from '@/utils/chooseImage';

export default {
  name: 'RjMessageInput',
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      MSGTYPE,
      textFormShow: false,
      textForm: {
        content: '',
      },
      textRules: {
        content: [{ required: true, message: '请输入内容' }],
      },
      linkFormShow: false,
      linkForm: {
        title: '',
        picurl: '',
        desc: '',
        url: '',
      },
      linkRules: {
        title: [
          { required: true, message: '请输入标题' },
        ],
        url: [
          { required: true, message: '请输入链接' },
          { type: 'url', message: '请输入正确的格式' },
        ],
      },
      miniappFormShow: false,
      miniappForm: {
        title: '',
        appid: '',
        page: '',
        pic_url: '',
      },
      miniappRules: {
        title: [{ required: true, message: '请输入标题' }],
        appid: [{ required: true, message: '请输入小程序appid' }],
        page: [{ required: true, message: '请输入小程序路径' }],
        pic_url: [{ required: true, message: '请添加小程序封面' }],
      },
    };
  },
  methods: {
    showTextForm() {
      this.textForm.content = '';
      if (this.$refs.textForm) {
        this.$refs.textForm.clearValidate();
      }
      this.textFormShow = true;
      this.$nextTick(() => {
        this.$el.querySelector('.text-input textarea').focus();
      });
    },
    addText() {
      this.$refs.textForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [...this.value, { msgtype: MSGTYPE.TEXT, text: this.textForm }]);
        this.textFormShow = false;
      });
    },
    showLinkForm() {
      this.linkForm.title = '';
      this.linkForm.picurl = '';
      this.linkForm.desc = '';
      this.linkForm.url = '';
      if (this.$refs.linkForm) {
        this.$refs.linkForm.clearValidate();
      }
      this.linkFormShow = true;
      this.$nextTick(() => {
        this.$el.querySelector('.link-title input').focus();
      });
    },
    addLink() {
      this.$refs.linkForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [...this.value, { msgtype: MSGTYPE.LINK, link: this.linkForm }]);
        this.linkFormShow = false;
      });
    },
    showMiniappForm() {
      this.miniappForm.title = '';
      this.miniappForm.appid = '';
      this.miniappForm.page = '';
      this.miniappForm.pic_url = '';
      if (this.$refs.miniappForm) {
        this.$refs.miniappForm.clearValidate();
      }
      this.miniappFormShow = true;
      this.$nextTick(() => {
        this.$el.querySelector('.miniapp-input input').focus();
      });
    },
    addMiniapp() {
      this.$refs.miniappForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [...this.value, { msgtype: MSGTYPE.MINIPROGRAM, miniprogram: this.miniappForm }]);
        this.miniappFormShow = false;
      });
    },
    selectImage() {
      chooseImage((file) => {
        this.$emit('input', [...this.value, {
          msgtype: MSGTYPE.IMAGE,
          image: { name: file.name, pic_url: window.URL.createObjectURL(file) },
        }]);
      });
    },
    selectFile() {
      chooseFile((file) => {
        this.$emit('input', [...this.value, {
          msgtype: MSGTYPE.FILE,
          file: { name: file.name, url: window.URL.createObjectURL(file) },
        }]);
      });
    },
    removeItem(item) {
      this.$emit('input', this.value.filter((c) => c !== item));
    },
  },
};
</script>

<style scoped lang="less">
.content-wrap {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  height: 140px;
}
.content-empty {
  height: 100%;
  color: #bfbfbf;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-box {
  height: 100%;
  padding: 5px 15px;
  box-sizing: border-box;
  line-height: 18px;
  font-size: 13px;
  overflow-y: auto;
}
.msg-item {
  display: flex;
  align-items: center;
  &+.msg-item {
    margin-top: 4px;
  }
  .el-button {
    padding: 2px;
  }
}
.msg-item-preview {
  flex: 1;
  overflow: hidden;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.msg-text {
  color: #606266;
}
/deep/ .el-link {
  display: block;
}
.func-btns {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  .el-button {
    padding: 5px 0;
    width: 48px;
    margin-left: 0;
  }
}
.el-form {
  padding: 0 16px;
}
.el-form-item + .el-form-item {
  margin-top: 18px;
}
.form-btns {
  text-align: center;
  padding-top: 14px;
  .el-button {
    width: 100px;
  }
}
</style>
