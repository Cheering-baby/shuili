<!--  -->
<template>
  <div class="bar1">
    <i class="iconfont icon-zhankai icon" @click="toggle" :class="{hide:show === false}"></i>
    <div class="year">
      <span>年份：</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-table
      ref="multipleTable"
      :data="typhoonItem"
      tooltip-effect="dark"
      style="width: 100%;cursor:pointer;margin-bottom:10px;font-size:12px !important;"
      :header-cell-style="headerStyle"
      stripe
      border
      height="190"
      @row-click="changeItem"
    >
      <!-- <el-table-column type="selection" width="30"></el-table-column> -->
      <el-table-column label="编号" prop="tfbh" width="120">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="name" label="中文名" width="120"></el-table-column>
      <el-table-column prop="ename" label="英文名"></el-table-column>
    </el-table>
    <div class="title">{{title}}</div>
    <el-table
      :data="dataItem"
      tooltip-effect="dark"
      style="width: 100%;cursor:pointer;margin-bottom:10px;font-size:12px;"
      :header-cell-style="headerStyle"
      stripe
      border
      height="260"
    >
      <el-table-column label="时间" width="140">
        <template slot-scope="scope">{{ scope.row.time | formatTime}}</template>
      </el-table-column>
      <el-table-column prop="pressure" label="气压(Pa)" width="70"></el-table-column>
      <el-table-column prop="power" label="风力(m/s)" width="80"></el-table-column>
      <el-table-column prop="move_speed" label="移速(km/h)" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Vue from 'vue'
// import {Select, Option } from 'element-ui'
// Vue.use(Select)
// Vue.use(Option)
export default {
  data() {
    return {
      options: [
        {
          value: 2019,
          label: "2019"
        },
        {
          value: 2018,
          label: "2018"
        }
      ],
      value: 2019,
      typhoonItem: [],
      headerStyle: {
        fontSize: "16px",
        color: "#78899d",
        fontWeight: "normal",
        backgroundColor: "#f3f6f9",
        height: "20px"
      },
      dataItem: [],
      tfbh: "",
      title: '路径信息',
      show: true
    };
  },
  watch: {
    value: function(val) {
      console.log(val);
      this.getTyphoonItem();
    }
  },
  filters: {
     formatTime: function(val) {
       let time = val.replace('T',' ')
       return time
     }
  },
  components: {},

  computed: {},

  mounted() {
    this.getTyphoonItem();
  },

  methods: {
    getTyphoonItem() {
      // console.log(123);
      this.$Axios
        .get("http://www.qzqxw.com/webapi/api/v1/typhoon", {
          params: {
            year: this.value,
            token: "xMGrAdP2VvNJHELk"
          }
        })
        .then(req => {
          // console.log(req);
          this.typhoonItem = req.data.data;
        });
    },
    getDataItem(row) {
      this.$Axios
        .get("http://www.qzqxw.com/webapi/api/v1/typhoon", {
          params: {
            tfbh: this.tfbh,
            history: true,
            forecast: true,
            token: "xMGrAdP2VvNJHELk"
          }
        })
        .then(req => {
          this.title = row.tfbh + row.name + '路径信息'
          // console.log(req.data.data[0]);
          this.dataItem = req.data.data[0].points;
          this.$emit('transData',req.data.data[0])
        });
    },
    changeItem(row) {
      console.log(row);
      this.tfbh = row.tfbh;
      this.getDataItem(row);
    },
    toggle() {
      this.show = !this.show
      console.log('toggle')
      this.$emit('isShow',this.show)
    }
  }
};
</script>
<style>
.el-input__inner {
  width: 120px;
}
.cell{
  font-size:12px;
}
</style>
<style lang='scss' scoped>
.bar1 {
  padding: 10px;
  // overflow-y: scroll;
  height: calc(100% - 20px);
  .icon{
    position:absolute;
    top:10px;
    left:-40px;
    width:30px;
    height:30px;
    line-height:30px;
    background-color:#fff;
    border-radius:50%;
    // border:1px solid rgb(165, 164, 164);
    cursor:pointer;
    text-align:center;
  }
  .hide{
    transform: rotate(-180deg)
  }
  .icon:hover{
    color:rgb(31, 144, 242);
  }
  .year {
    display: flex;
    // height:50px;
    align-items: center;
    margin-bottom: 10px;
  }
  .title{
    border-left:5px solid rgb(31, 144, 242);
    height:20px;
    line-height:20px;
    margin-bottom:10px;
    padding-left:10px;
  }
}
</style>