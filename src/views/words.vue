<template>
  <div>
    <rj-header class="page-header">
      <el-tabs :value="type" @input="toPage">
        <el-tab-pane label="企业话术库" :name="WORDSTYPE.BUSINESS"></el-tab-pane>
        <el-tab-pane label="个人话术库" :name="WORDSTYPE.PERSONAL"></el-tab-pane>
      </el-tabs>
      <el-button
        v-if="type===WORDSTYPE.PERSONAL"
        type="primary"
        plain
        class="create-words-btn"
        @click="$router.push('words_edit')"
      >
        新建话术
      </el-button>
    </rj-header>
    <div class="page-words">
      <el-form :model="searchForm" @submit.prevent.native="" size="small">
        <el-form-item prop="keywords">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="searchForm.keywords"
            @input="search"
          />
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        node-key="id"
        icon-class="el-icon-s-unfold"
        :data="wordsGroups"
        :filter-node-method="filterNode"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{node.label}}</span>
          <el-button v-if="!data.children" type="primary" plain @click="sendMessage(data)">发送</el-button>
        </div>
      </el-tree>
      <div class="group-btn" v-if="type===WORDSTYPE.PERSONAL">
        <el-button type="primary" icon="el-icon-plus" @click="$router.push('words_group_edit')">新建分组</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { WORDSTYPE } from '@/constants';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      WORDSTYPE,
      searchForm: { keywords: '' },
      wordsGroups: [
        {
          id: 1,
          label: '话术分组1',
          children: [
            { id: 2, label: '话术标题2' },
            { id: 3, label: '话术标题3' },
            { id: 4, label: '话术标题4' },
            { id: 5, label: '话术标题5' },
          ],
        },
        {
          id: 11,
          label: '话术分组11',
          children: [
            { id: 12, label: '话术标题12' },
            { id: 13, label: '话术标题13' },
            { id: 14, label: '话术标题14' },
            { id: 15, label: '话术标题15' },
          ],
        },
        {
          id: 21,
          label: '话术分组21',
          children: [
            { id: 22, label: '话术标题22' },
            { id: 23, label: '话术标题23' },
            { id: 24, label: '话术标题24' },
            { id: 25, label: '话术标题25' },
          ],
        },
        {
          id: 31,
          label: '话术分组31',
          children: [
            { id: 32, label: '话术标题32' },
            { id: 33, label: '话术标题33' },
            { id: 34, label: '话术标题34' },
            { id: 35, label: '话术标题35' },
          ],
        },
      ],
    };
  },
  methods: {
    toPage(type) {
      if (type !== this.type) {
        this.$router.replace(`words_${type}`);
      }
    },
    search() {
      this.$refs.tree.filter(this.searchForm.keywords);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    sendMessage(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped lang="less">
.rj-header.page-header {
  padding: 0;
  box-shadow: none;
  position: relative;
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
}
/deep/ .el-tabs__nav-wrap {
  padding: 0 12px;
}
/deep/ .el-tabs__item {
  height: 54px;
  line-height: 54px;
}
.create-words-btn {
  top: 13px;
  right: 12px;
  position: absolute;
}
.page-words {
  padding: 18px 12px 108px;
}
/deep/ .el-tree-node__content {
  height: 38px;
}
/deep/ .el-tree-node__expand-icon {
  font-size: 16px;
}
.el-form {
  padding: 0 7px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    padding: 0;
    width: 42px;
    height: 22px;
  }
}
.group-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 40px;
  text-align: center;
  .el-button {
    width: 180px;
  }
}
</style>
