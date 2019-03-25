<template>
  <div>
    <headBar title="实时水情" style="margin-bottom:10px;" />
    <el-table :data="tableData" stripe style="width: 100%" border :header-cell-style="headerStyle" height="280">
      <el-table-column prop="stcd" label="站名" width="100"></el-table-column>
      <el-table-column prop="level" label="水位(m)" width="80"></el-table-column>
      <el-table-column prop="warn" label="警戒线" width="100"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
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
          date: "2019-03-25 10:00:00",
          stcd: "站点1",
          level: '10.0',
          warn: "15.0"
        },
        {
          date: "2019-03-25 12:00:00",
          stcd: "站点2",
          level: '9.5',
          warn: "12.0"
        },
        {
          date: "2019-03-25 12:30:00",
          stcd: "站点3",
          level: '6.3',
          warn: "14.3"
        },
        {
          date: "2019-03-25 11:00:00",
          stcd: "站点4",
          level: '6.9',
          warn: "14.0"
        }
      ],
      headerStyle: {
        fontSize: "16px",
        color: "#78899d",
        fontWeight: "normal",
        backgroundColor: "#f3f6f9",
        height:'20px'
      }
    }
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