<template>
  <div>
    <rj-header show-back>新建话术分组</rj-header>
    <div class="page-words-group-edit">
      <el-form
        :model="form"
        :rules="rules"
        v-loading="loading"
        ref="form"
        size="small"
        label-width="112px"
        @submit.prevent.native="submit"
      >
        <el-form-item label="话术分组名称" prop="groupName">
          <el-input placeholder="请输入" v-model="form.groupName" autofocus></el-input>
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
import { WORDSTYPE } from '@/constants';
import { createWordsGroup } from '@/api/common';

export default {
  data() {
    return {
      loading: false,
      form: {
        groupName: null,
      },
      rules: {
        groupName: [{ required: true, message: '请输入话术分组名称' }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        createWordsGroup(WORDSTYPE.PERSONAL, this.form.groupName).then(() => {
          this.loading = false;
          this.$router.back();
        }).catch(() => {
          this.loading = false;
        });
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
