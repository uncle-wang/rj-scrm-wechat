<template>
  <div>
    <rj-header>查看数据</rj-header>
    <div class="page-data">
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column label="【客户数据查看】" prop="label" label-class-name="indent"></el-table-column>
        <el-table-column :label="date" prop="content"></el-table-column>
      </el-table>
      <div class="func-btn">
        <el-button type="primary" plain>其他数据</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      data: {
        customerTotalNum: 0,
        increaseNum: 0,
        lostNum: 0,
      },
      date: moment().format('yyyy-MM-DD'),
      loading: true,
    };
  },
  computed: {
    tableData() {
      return [
        { label: '当日客户数', content: `${this.data.customerTotalNum}人` },
        { label: '当日流失客户数', content: `${this.data.lostNum}人` },
        { label: '当日新增客户数', content: `${this.data.increaseNum}人` },
      ];
    },
  },
  created() {
    this.$request({
      url: '/api/coustomer/statistics/today/statistics',
    }).then((data) => {
      this.data.customerTotalNum = data.customerTotalNum;
      this.data.increaseNum = data.increaseNum;
      this.data.lostNum = data.lostNum;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped lang="less">
.page-data {
  padding: 18px 12px;
}
/deep/ .indent {
  text-indent: -3px;
}
.func-btn {
  margin-top: 12px;
  text-align: right;
}
</style>
