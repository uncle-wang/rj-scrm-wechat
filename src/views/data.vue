<template>
  <div class="page-data">
    <el-table :data="data" border>
      <el-table-column label="【客户数据查看】" prop="label" label-class-name="indent"></el-table-column>
      <el-table-column label="2021-08-17" prop="content"></el-table-column>
    </el-table>
    <el-button type="primary" plain>其他数据</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: '当日客户数',
          content: '1000人',
        },
        {
          label: '当日流失客户数',
          content: '50人',
        },
        {
          label: '当日新增客户数',
          content: '50人',
        },
      ],
    };
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
.el-button {
  margin-top: 12px;
}
</style>
