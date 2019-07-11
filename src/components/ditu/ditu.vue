<template>
  <div class="container1">
    <div class="map">
      <dmap
        :center="[119.3, 26.08333]"
        :zoom="10"
        provider="GaodeMap.Normal"
        style="width:100%;"
        @init="init"
        :zoomControl="true"
      />
    </div>
    <div class="table">
      <div class="search" ref="search">
        <div class="table_title">{{label}}</div>
        <div class="content">
          <!-- <span>搜索</span> -->
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          <el-button type="primary" size="mini" @click="searchTable">搜索</el-button>
        </div>
      </div>
      <div class="show" ref="show">
        <div class="columns">
          <div
            v-for="item in columns"
            :key="item.label"
            class="label"
            :style="item.style"
          >{{item.label}}</div>
        </div>
        <div class="content" ref="content" v-if="searchContent.length!==0" :style="tableHeight">
          <div
            class="content_index"
            v-for="(item,index) in searchContent"
            :key="index"
            @dblclick="showPoint(item)"
            @click="showPoint1(item)"
          >
            <div v-for="item1 in columns" :key="item1.field" :style="item1.style">
              {{item[item1.field] | fmt(item1.field,index)}}
              <!-- <div class="Popover"></div> -->
            </div>
          </div>
        </div>
        <div v-else class="no-data">没有数据</div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible" :modal="false">
      <div class="table_two">
        <div class="table_label">{{form.label}}</div>
        <el-row
          style="border-left: 1px solid rgb(235,238,245);border-bottom:1px solid rgb(235,238,245);"
        >
          <el-col
            :span="12"
            v-for="item in form.columns"
            :key="item.text"
            style="border-top: 1px solid rgb(235,238,245);"
            class="col"
          >
            <div class="grid-content bg-purple form_content">
              <div class="info">{{item.text}}</div>
              <div class="data">{{formData[item.field]}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table_two">
        <div class="table_label">{{table.label}}</div>
        <el-table :data="tableData" :header-cell-style="headerStyle" stripe border>
          <el-table-column
            :property="item.field"
            :label="item.text"
            :width="item.width"
            v-for="item in table.columns"
            :key="item.text"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
import {
  Table,
  TableColumn,
  Dialog,
  Select,
  Option,
  Button,
  Radio,
  Row,
  Col,
  Input
} from "element-ui";
Vue.use(dmap);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Option);
Vue.use(Select);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
export default {
  name: "mainPage",
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    testData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chart: {
      type: Object,
      default: () => {
        return {};
      }
    },
    table: {
      type: Object,
      default: function() {
        return {};
      }
    },
    form: {
      type: Object,
      default: function() {
        return {};
      }
    },
    label: String,
    // searchContent: Array,
    iconUrl: {
      type: String,
      default: "public/img/shuiku.png"
    }
  },
  data() {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      searchHeight: "",
      tableData: [],
      formData: [],
      formData: {},
      headerStyle: {
        fontSize: "14px",
        color: "#78899d",
        fontWeight: "normal",
        backgroundColor: "#f3f6f9"
      },
      dialogTableVisible: false,
      gridData: [],
      tableData_filter: {},
      gridData1: [],
      title: "",
      selectOption: [],
      option: "",
      radio: false,
      showRegion: false,
      tableHeight: {
        height: ""
      },
      timer: null,
      search: '',
      searchContent: []
    };
  },
  computed: {},
  filters: {
    table_filter(val, x) {
      return val.filter(data => !x || data.adcd.includes(x));
    },
    fmt(val, id, index) {
      if (id == "rowid") {
        return index + 1;
      } else {
        return val;
      }
    }
  },
  watch: {
    testData: function(val) {
      this.searchContent = val
      this.init();
    },
    searchContent: function() {
        // this.init()
    }
  },
  mounted() {
    this.getData();
    this.tableHeight.height =
      this.winH - 141 + "px";
    // this.$store.commit('increment')
    // console.log(this.$store.state.count)
    this.searchContent = this.testData
  },
  methods: {
    getData() {
      // this.$Axios
      //   .get('http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_material_point&',{

      //   })
      //   .then(d => {
      //       this.tableData = d.data.data
      //       this.init()
      //       let len = this.tableData.length
      //       for(let i=0;i<len;i++){
      //           if(!this.tableData_filter[this.tableData[i].adnm]){
      //               let arr = []
      //               arr.push(this.tableData[i])
      //               this.tableData_filter[this.tableData[i].adnm] = arr
      //           }else{
      //               this.tableData_filter[this.tableData[i].adnm].push(this.tableData[i])
      //           }
      //       }
      //   })
      this.$Axios
        .get(
          "http://192.168.118.226:9831/WebApi/api/v2/basic/data?key=s_area_by_material",
          {}
        )
        .then(d => {
          this.selectOption = d.data.data;
          this.searchHeight = this.$refs.search.offsetHeight;
        });
    },
    init(map) {
      // this.loading = this.$loading();
      let layer = this.map.layer();
      let data = this.searchContent;
      layer.addPoints(data, data => {
        return {
          feature: {
            src: this.iconUrl
          },
          tooltip: {
            zoom: 15,
            text: data.stnm,
            direction: "top"
          }
        };
      });
    },
    showPoint(row) {
      this.timer && clearTimeout(this.timer);
      console.log(row);
      this.formData = row;
      // let lat = row.lat
      // let lon = row.lon
      let url = this.chart["providerUrl"].replace(/(\s*$)/g, "");
      let ennmcd = row["ennmcd"].replace(/(\s*$)/g, "");

      this.title = row[this.chart["nameField"]];
      this.$Axios
        .get(url, {
          params: {
            ennmcd: ennmcd
          }
        })
        .then(d => {
          console.log(d.data.data);
          this.dialogTableVisible = true;
          this.title = row.stnm;
          this.tableData = d.data.data;
        });
    },
    showPoint1(row) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.map.setView([row.lon, row.lat], 15);
      }, 300);
    },
    change() {
      this.map.fullScreen();
    },
    searchTable() {
       this.searchContent = this.testData.filter(data => !this.search || data.ennm.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
};
</script>
<style lang="scss">
.el-dialog {
  width: 700px;
}
.el-dialog__header {
  background-color: rgb(28, 123, 232);
  padding-top: 10px;
}
.el-dialog__body {
  padding-top: 0;
}
.el-dialog__title {
  color: #fff;
}
.el-dialog__headerbtn {
  top: 10px;
  font-size: 18px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  min-height: 36px;
}
</style>

<style lang="scss" scoped>
.container1 {
  width: 100%;
  display: flex;
  height: 100%;
  user-select: none;
  .map {
    position: relative;
    flex: 1;
  }
  .table {
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .search {
      display: flex;
      background-color: #f3f6f9;
      align-items:center;
      justify-content:space-between;
      padding-right:20px;
      .content {
        display: flex;
      }
      .table_title {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 18px;
        color: rgb(66, 66, 66);
      }
    }
    .show {
      flex: 1;
      .columns {
        display: flex;
        align-items: center;
        height: 40px;
        background-color: #f3f6f9;
        border-top: 1px solid #ebeef5;
        .label {
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          font-size: 14px;
          color: #909399;
          border-right: 1px solid #ebeef5;
        }
        .label:last-child {
          flex: 1;
          border-right: 0px;
        }
      }
      .content {
        overflow: auto;
        .content_index {
          display: flex;
          align-items: center;
          height: 40px;
          border-top: 1px solid #ebeef5;
          cursor: pointer;
          div {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            font-size: 14px;
            color: #606266;
            border-right: 1px solid #ebeef5;
          }
          div:last-child {
            flex: 1;
            border-right: 0px;
          }
        }
        .content_index:nth-child(even) {
          background-color: rgb(250, 250, 250);
        }
        .content_index:hover {
          background-color: rgb(245, 247, 250);
        }
        .content_index:last-child {
          border: 1px solid #ebeef5;
        }
      }
      .no-data {
        height: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px solid #ebeef5;
        color: #909399;
      }
    }
  }
}
.table_two {
  margin-bottom: 10px;
  .table_label {
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  .form_content {
    display: flex;
    height: 30px;
    div {
      width: 50%;
      height: 36px;
      line-height: 36px;
      padding-left: 20px;
    }
    .info {
      background-color: rgb(249, 250, 250);
      border-right: 1px solid rgb(235, 238, 245);
    }
    .data {
      border-right: 1px solid rgb(235, 238, 245);
    }
  }
}
</style>

