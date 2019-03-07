<template>
  <div>
    <headBar title="实时水情" style="margin-bottom:10px;" />
    <el-table :data="tableData" stripe style="width: 100%" border :header-cell-style="headerStyle" height="280">
      <el-table-column prop="date" label="站名" width="100"></el-table-column>
      <el-table-column prop="name" label="水位" width="80"></el-table-column>
      <el-table-column prop="name" label="警戒线" width="100"></el-table-column>
      <el-table-column prop="address" label="时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import headBar from "@/components/head/head.vue";
import { Table, TableColumn } from "element-ui";
Vue.use(Table)
Vue.use(TableColumn)
export default {
  name: "yuliang",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      headerStyle: {
        fontSize: "16px",
        color: "#78899d",
        fontWeight: "normal",
        backgroundColor: "#f3f6f9",
        height:'20px'
      }
    };
  },

  components: {
    headBar
  },

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>