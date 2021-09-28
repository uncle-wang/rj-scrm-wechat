<template>
  <div>
    <rj-header show-back>新建话术</rj-header>
    <div class="page-words-edit">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="84px"
        size="small"
        @submit.prevent.native="submit"
        v-loading="loading"
      >
        <el-form-item label="分组:" prop="groupId">
          <el-select placeholder="选择分组" v-model="form.groupId">
            <el-option v-for="g in groups" :key="g.id" :label="g.groupName" :value="g.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input placeholder="请输入" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="话术内容:" prop="list">
          <rj-message-input :single-text="false" v-model="form.list" @input="checkMessage" />
        </el-form-item>
        <el-form-item label-width="0" class="form-btns">
          <el-button size="mini" type="primary" native-type="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { WORDSTYPE } from '@/constants';
import { getWordsGroups, createWords } from '@/api/common';

export default {
  data() {
    return {
      loading: false,
      groups: [],
      form: {
        bizType: WORDSTYPE.PERSONAL,
        groupId: null,
        title: null,
        list: [],
      },
      rules: {
        groupId: [{ required: true, message: '请选择分组' }],
        title: [{ required: true, message: '请输入标题' }],
        list: [{ required: true, validator: (rule, value, callback) => {
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
      this.$refs.form.validateField('list');
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        createWords(this.form).then(() => {
          this.loading = false;
          this.$router.back();
        }).catch(() => {
          this.loading = false;
        });
      });
    },
  },
  created() {
    this.loading = true;
    getWordsGroups(WORDSTYPE.PERSONAL).then((data) => {
      this.groups = data;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
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
