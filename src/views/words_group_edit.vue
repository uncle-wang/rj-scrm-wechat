<template>
  <div>
    <rj-header show-back>新建话术分组</rj-header>
    <div class="page-words-group-edit">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        size="small"
        label-width="112px"
        @submit.prevent.native="submit"
      >
        <el-form-item label="话术分组名称" prop="title">
          <el-input placeholder="请输入" v-model="form.title" autofocus></el-input>
        </el-form-item>
        <el-form-item class="form-btns" label-width="0">
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
        group: null,
        title: null,
        contents: [],
      },
      rules: {
        title: [{ required: true, message: '请输入话术分组名称' }],
      },
    };
  },
  methods: {
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
.page-words-group-edit {
  padding: 18px 12px;
}
.form-btns {
  margin-top: 108px;
  text-align: center;
  .el-button {
    width: 100px;
  }
}
</style>
