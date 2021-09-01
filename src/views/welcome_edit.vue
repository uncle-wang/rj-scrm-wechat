<template>
  <div>
    <rj-header show-back>编辑欢迎语</rj-header>
    <div class="page-welcome-edit">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        size="small"
        @submit.prevent.native="submit"
      >
        <el-form-item prop="contents">
          <rj-message-input v-model="form.contents" @input="checkMessage" placeholder="请输入欢迎语内容" />
        </el-form-item>
        <el-form-item label-width="0" class="form-btns">
          <el-button size="mini" @click="$router.back()">取消</el-button>
          <el-button size="mini" type="primary" native-type="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        contents: [],
      },
      rules: {
        contents: [{ required: true, validator: (rule, value, callback) => {
          if (value.length <= 0) {
            callback(new Error('请添加欢迎语内容'));
          } else {
            callback();
          }
        } }],
      },
    };
  },
  methods: {
    checkMessage() {
      this.$refs.form.validateField('contents');
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        console.log('提交');
      });
    },
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
