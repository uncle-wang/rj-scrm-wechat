<template>
  <div>
    <rj-header>新建话术</rj-header>
    <div class="page-words-edit">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="84px"
        size="small"
        @submit.prevent.native="submit"
      >
        <el-form-item label="分组:" prop="group">
          <el-select placeholder="选择分组" v-model="form.group">
            <el-option label="aaa" value="aaa"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input placeholder="请输入" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="话术内容:" prop="contents">
          <rj-message-input :single-text="false" v-model="form.contents" @input="checkMessage" />
        </el-form-item>
        <el-form-item label-width="0" class="form-btns">
          <el-button type="primary" native-type="submit">确认</el-button>
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
        group: null,
        title: null,
        contents: [],
      },
      rules: {
        group: [{ required: true, message: '请选择分组' }],
        title: [{ required: true, message: '请输入标题' }],
        contents: [{ required: true, validator: (rule, value, callback) => {
          if (value.length <= 0) {
            callback(new Error('请添加话术内容'));
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
.page-words-edit {
  padding: 18px 12px;
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
