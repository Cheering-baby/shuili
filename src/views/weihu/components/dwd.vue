<template>
  <div class="dwd" ref="dwd">
    <!-- <el-table :data="tableData" stripe style="width: 100%" border :header-cell-style="headerStyle" :height="height">
      <el-table-column prop="ennm" label="站名" width="140"></el-table-column>
      <el-table-column prop="name" label="水位" width="80"></el-table-column>
      <el-table-column prop="name" label="警戒线" width="100"></el-table-column>
      <el-table-column prop="address" label="时间"></el-table-column>
    </el-table> -->
    <iframe scrolling="no" src="http://192.168.118.226:9831/CommonReport/TableList.aspx?TableDBID=10251&PowerSetStr=Add,Update,Del,Sort,Em,Im" frameborder="0" width="100%" :height="height" allowtransparency="true" color="000000"></iframe>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
export default {
  props: {
    height:{
      type: Number,
      default: function() {
        let now = document.documentElement.clientHeight || document.body.clientHeight
        return now - 65
      }
    }
  },
  data () {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      tableData: [],
      headerStyle: {
        fontSize: "16px",
        color: "#78899d",
        fontWeight: "normal",
        backgroundColor: "#f3f6f9",
        height:'20px'
      }
    }
  },

  components: {},


  mounted () {
    this.$Axios.get('http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_project_sk_list&')
      .then(res => {
        this.tableData = res.data.data
      })
  },

  methods: {}

}

</script>
<style lang='scss' scoped>
.dwd{
  height:100%;
}
</style>