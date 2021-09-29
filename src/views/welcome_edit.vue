<template>
  <div>
    <rj-header show-back>编辑欢迎语</rj-header>
    <div class="page-welcome-edit">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        size="small"
        v-loading="loading"
        @submit.prevent.native="submit"
      >
        <el-form-item prop="welcomeReqVoList">
          <rj-message-input v-model="form.welcomeReqVoList" @input="checkMessage" placeholder="请输入欢迎语内容" />
        </el-form-item>
        <el-form-item label-width="0" class="form-btns">
          <el-button size="mini" @click="$router.back()">取消</el-button>
          <el-button size="mini" type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getWelcomeList, addWelcome, editWelcome } from '@/api/common';

export default {
  data() {
    return {
      // 0-新建 1-编辑
      type: 0,
      loading: true,
      form: {
        welcomeReqVoList: [],
      },
      rules: {
        welcomeReqVoList: [{ required: true, validator: (rule, value, callback) => {
          if (value.length <= 0) {
            callback(new Error('请添加内容'));
          } else {
            callback();
          }
        } }],
      },
    };
  },
  methods: {
    checkMessage() {
      this.$refs.form.validateField('welcomeReqVoList');
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        const p = this.type === 0 ? addWelcome(this.form) : editWelcome(this.form);
        p.then(() => {
          this.loading = false;
          this.$router.back();
        }).catch(() => {
          this.loading = false;
        });
      });
    },
  },
  created() {
    getWelcomeList().then((data) => {
      if (data && data.length > 0) {
        this.type = 1;
        this.form.welcomeReqVoList = data;
      }
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped lang="less">
.page-welcome-edit {
  padding: 18px 32px;
}
.el-select {
  width: 100%;
}
.form-btns {
  margin-top: 108px;
  text-align: center;
  .el-button {
    width: 100px;
  }
}
</style>
