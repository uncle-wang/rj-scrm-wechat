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
        lazy
        :load="loadWords"
        :data="wordsGroups"
        :filter-node-method="filterNode"
        :props="{label:'name',isLeaf:isWords}"
        v-loading="loading"
      >
        <div class="custom-tree-node" slot-scope="{ data }">
          <div v-if="data.leaf" class="words-row">
            <span>{{data.title}}</span>
            <el-button type="primary" plain @click="sendMessage(data)">发送</el-button>
          </div>
          <div v-else>{{data.name}}</div>
        </div>
      </el-tree>
      <div class="group-btn" v-if="type===WORDSTYPE.PERSONAL">
        <el-button type="primary" icon="el-icon-plus" @click="$router.push('words_group_edit')">新建分组</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import sendChatMessage from '@/utils/sendChatMessage';
import { WORDSTYPE } from '@/constants';
import { getWordsTree, getWordsByGroup } from '@/api/common';

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
      loading: false,
      searchForm: { keywords: '' },
      wordsGroups: [],
    };
  },
  methods: {
    toPage(type) {
      if (type !== this.type) {
        this.$router.replace(`words_${type}`);
      }
    },
    getTree() {
      this.loading = true;
      getWordsTree(this.type).then((data) => {
        this.wordsGroups = data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.wordsGroups = [];
        this.loading = false;
      });
    },
    loadWords(node, resolve) {
      if (!node.data.id) return;
      const list = node.data.children || [];
      getWordsByGroup(this.type, node.data.id).then((data) => {
        const words = data.list.map((item) => ({
          ...item,
          leaf: true,
        }));
        list.push(...words);
        resolve(list);
      }).catch(() => {
        resolve(list);
      });
    },
    isWords(data) {
      return Boolean(data.leaf);
    },
    search() {
      this.$refs.tree.filter(this.searchForm.keywords);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    sendMessage(data) {
      sendChatMessage(data.list);
    },
  },
  created() {
    this.getTree();
  },
  watch: {
    $route() {
      this.getTree();
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
}
.words-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7px;
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
