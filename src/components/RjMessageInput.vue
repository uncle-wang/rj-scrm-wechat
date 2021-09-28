<template>
  <div class="rj-message-input">
    <div v-if="singleText" class="single-text-box">
      <el-input
        type="textarea"
        resize="none"
        :placeholder="placeholder"
        :value="singleTextValue"
        @input="emitSingleText"
      />
    </div>
    <div class="rj-message-content-wrap">
      <div v-if="value.length<=0" class="content-empty">
        点击下方按钮添加{{singleText?'附件':'内容'}}
      </div>
      <div v-else class="content-box">
        <div v-for="(item,index) in value" :key="index"  class="msg-item">
          <div class="msg-item-preview">
            <!-- 文字 -->
            <div v-if="item.extType===MSGTYPE.TEXT" class="msg-text ellipsis">
              {{item.textContent}}
            </div>
            <!-- 链接 -->
            <div v-else-if="item.extType===MSGTYPE.LINK" class="msg-link">
              <el-link
                class="ellipsis"
                type="primary"
                :href="item.linkUrl"
                :underline="false"
                target="_blank"
              >
                {{item.linkTitle}}
              </el-link>
            </div>
            <!-- 小程序 -->
            <div v-else-if="item.extType===MSGTYPE.MINIPROGRAM" class="msg-text ellipsis">
              [小程序]{{item.miniTitle}}
            </div>
            <!-- 图片 -->
            <div v-else-if="item.extType===MSGTYPE.IMAGE" class="msg-text ellipsis">
              [图片]{{item.imageMediaId}}
            </div>
            <!-- 文件 -->
            <div v-else class="msg-text ellipsis">
              [文件]{{item.fileMediaId}}
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
        v-if="!singleText"
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
    <rj-dialog
      v-if="textFormShow"
      title="添加文字内容"
      @close="textFormShow=false"
      class="dialog-text-form"
    >
      <el-form
        :model="textForm"
        :rules="textRules"
        size="medium"
        ref="textForm"
        @submit.native.prevent="addText"
      >
        <el-form-item label="文字" prop="textContent">
          <el-input
            class="text-input"
            type="textarea"
            resize="none"
            placeholder="请输入内容"
            v-model="textForm.textContent"
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
    <rj-dialog
      v-if="linkFormShow"
      title="添加链接"
      @close="linkFormShow=false"
      class="dialog-link-form"
    >
      <el-form
        :model="linkForm"
        :rules="linkRules"
        size="medium"
        ref="linkForm"
        @submit.native.prevent="addLink"
      >
        <el-form-item label="消息标题" prop="linkTitle">
          <el-input
            class="link-title"
            placeholder="请输入标题"
            v-model="linkForm.linkTitle"
            autofocus
          />
        </el-form-item>
        <el-form-item label="消息链接" prop="linkUrl">
          <el-input
            placeholder="请输入链接"
            v-model="linkForm.linkUrl"
          />
        </el-form-item>
        <el-form-item label="消息描述" prop="linkDesc">
          <el-input
            placeholder="请输入描述"
            v-model="linkForm.linkDesc"
          />
        </el-form-item>
        <el-form-item label="消息封面" prop="linkPicurl">
          <rj-image-input v-model="linkForm.linkPicurl"></rj-image-input>
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button @click="linkFormShow=false">取消</el-button>
          <el-button type="primary" native-type="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </rj-dialog>
    <!-- 小程序表单 -->
    <rj-dialog
      v-if="miniappFormShow"
      title="添加小程序"
      @close="miniappFormShow=false"
      class="dialog-miniprogram-form"
    >
      <el-form
        :model="miniappForm"
        :rules="miniappRules"
        size="medium"
        ref="miniappForm"
        @submit.native.prevent="addMiniapp"
      >
        <el-form-item label="小程序标题" prop="miniTitle" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.miniTitle"
            autofocus
          />
        </el-form-item>
        <el-form-item label="小程序appid" prop="miniAppid" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.miniAppid"
          />
        </el-form-item>
        <el-form-item label="小程序路径" prop="miniPage" required>
          <el-input
            class="miniapp-input"
            placeholder="请输入"
            v-model="miniappForm.miniPage"
          />
        </el-form-item>
        <el-form-item label="小程序封面" prop="miniPicMediaId" required>
          <rj-image-input media v-model="miniappForm.miniPicMediaId" @input="checkImage" />
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
import { MSGTYPE, FILETYPE } from '@/constants';
import RjImageInput from '@/components/RjImageInput.vue';
import chooseFile from '@/utils/chooseFile';
import chooseImage from '@/utils/chooseImage';
import { uploadMedia } from '@/api/common';

export default {
  name: 'RjMessageInput',
  components: { RjImageInput },
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    singleText: {
      type: Boolean,
      required: false,
      default: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入文字',
    },
  },
  data() {
    return {
      MSGTYPE,
      textFormShow: false,
      textForm: {
        textContent: '',
      },
      textRules: {
        textContent: [{ required: true, message: '请输入内容' }],
      },
      linkFormShow: false,
      linkForm: {
        linkTitle: '',
        linkPicurl: '',
        linkDesc: '',
        linkUrl: '',
      },
      linkRules: {
        linkTitle: [
          { required: true, message: '请输入标题' },
        ],
        linkUrl: [
          { required: true, message: '请输入链接' },
          { type: 'url', message: '请输入正确的格式' },
        ],
      },
      miniappFormShow: false,
      miniappForm: {
        miniTitle: '',
        miniAppid: '',
        miniPage: '',
        miniPicMediaId: '',
      },
      miniappRules: {
        miniTitle: [{ required: true, message: '请输入标题' }],
        miniAppid: [{ required: true, message: '请输入小程序appid' }],
        miniPage: [{ required: true, message: '请输入小程序路径' }],
        miniPicMediaId: [{ required: true, message: '请添加小程序封面' }],
      },
    };
  },
  computed: {
    singleTextValue() {
      const firstItem = this.value[0];
      if (firstItem && firstItem.extType === MSGTYPE.TEXT) {
        return firstItem.textContent;
      }
      return '';
    },
  },
  methods: {
    emitSingleText(v) {
      const [firstItem, ...others] = this.value;
      if (firstItem && firstItem.extType === MSGTYPE.TEXT) {
        this.$emit('input', v ? [
          { extType: MSGTYPE.TEXT, textContent: v },
          ...others,
        ] : [...others]);
      } else {
        this.$emit('input', v ? [
          { extType: MSGTYPE.TEXT, textContent: v },
          ...this.value,
        ] : [...this.value]);
      }
    },
    showTextForm() {
      this.textForm.textContent = '';
      if (this.$refs.textForm) {
        this.$refs.textForm.clearValidate();
      }
      this.textFormShow = true;
      this.$nextTick(() => {
        document.querySelector('.dialog-text-form .text-input textarea').focus();
      });
    },
    addText() {
      this.$refs.textForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [...this.value, { extType: MSGTYPE.TEXT, ...this.textForm }]);
        this.textFormShow = false;
      });
    },
    showLinkForm() {
      this.linkForm.linkTitle = '';
      this.linkForm.linkPicurl = '';
      this.linkForm.linkDesc = '';
      this.linkForm.linkUrl = '';
      if (this.$refs.linkForm) {
        this.$refs.linkForm.clearValidate();
      }
      this.linkFormShow = true;
      this.$nextTick(() => {
        document.querySelector('.dialog-link-form .link-title input').focus();
      });
    },
    addLink() {
      this.$refs.linkForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [...this.value, { extType: MSGTYPE.LINK, ...this.linkForm }]);
        this.linkFormShow = false;
      });
    },
    showMiniappForm() {
      this.miniappForm.miniTitle = '';
      this.miniappForm.miniAppid = '';
      this.miniappForm.miniPage = '';
      this.miniappForm.miniPicMediaId = '';
      if (this.$refs.miniappForm) {
        this.$refs.miniappForm.clearValidate();
      }
      this.miniappFormShow = true;
      this.$nextTick(() => {
        document.querySelector('.dialog-miniprogram-form .miniapp-input input').focus();
      });
    },
    addMiniapp() {
      this.$refs.miniappForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit('input', [
          ...this.value,
          {
            extType: MSGTYPE.MINIPROGRAM,
            ...this.miniappForm,
          },
        ]);
        this.miniappFormShow = false;
      });
    },
    checkImage() {
      this.$refs.miniappForm.validateField('miniPicMediaId');
    },
    selectImage() {
      chooseImage((file) => {
        uploadMedia(FILETYPE.IMAGE, file).then((res) => {
          this.$emit('input', [...this.value, {
            extType: MSGTYPE.IMAGE,
            imageMediaId: res.mediaId,
          }]);
        }).catch(() => {});
      });
    },
    selectFile() {
      chooseFile((file) => {
        uploadMedia(FILETYPE.FILE, file).then((res) => {
          this.$emit('input', [...this.value, {
            extType: MSGTYPE.FILE,
            fileMediaId: res.mediaId,
          }]);
        }).catch(() => {});
      });
    },
    removeItem(item) {
      this.$emit('input', this.value.filter((c) => c !== item));
    },
  },
};
</script>

<style lang="less">
.rj-message-content-wrap {
  color: @c_border_input;
}
.is-error .rj-message-content-wrap {
  border-color: @c_error;
}
</style>
<style scoped lang="less">
.single-text-box {
  margin-bottom: 8px;
}
.rj-message-content-wrap {
  border-width: 1px;
  border-style: solid;
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
  font-size: 13px;
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
