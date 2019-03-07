<template>
  <div class="jizhi" :style="{width: width + 'px'}">
    <div class="title">
      <div class="title_name">{{title}}</div>
    </div>
    <div class="time" style="margin-bottom:10px;">
      <el-button v-for="item in timeRange" :key="item" size="mini" :class="{active1:item == currentTime}" @click="changeTime(item)">{{item}}</el-button>
    </div>
    <ve-line :data="chartData" height="300px" :grid="grid"></ve-line>
  </div>
</template>

<script>
import Vue from 'vue'
import VeLine from 'v-charts/lib/line'
import { Button } from 'element-ui'
Vue.use(Button)
export default {
  name: 'jizhi',
  props: {
    width:{
      type: Number,
      default: 500
    },
    title:{
      type: String,
      default: '近24小时极值雨量'
    },
  },
  data () {
    return {
      timeRange: ['1小时极值','3小时极值','6小时极值','12小时极值','24小时极值'],
      currentTime: '1小时极值',
      chartData: {
        columns: ['地区', '极大值', '极小值'],
        rows: [
          { '地区': '鼓楼', '极大值': 1393, '极小值': 1093 },
          { '地区': '台江', '极大值': 3530, '极小值': 3230 },
          { '地区': '仓山', '极大值': 2923, '极小值': 2623 },
          { '地区': '马尾', '极大值': 1723, '极小值': 1423 },
          { '地区': '晋安', '极大值': 3792, '极小值': 3492 },
          { '地区': '闽侯', '极大值': 4593, '极小值': 4293 },
          { '地区': '连江', '极大值': 3593, '极小值': 1900 },
          { '地区': '罗源', '极大值': 1258, '极小值': 500 },
          { '地区': '闽清', '极大值': 2593, '极小值': 1293 },
          { '地区': '永泰', '极大值': 1793, '极小值': 1193 },
          { '地区': '福清', '极大值': 3093, '极小值': 2293 },
          { '地区': '长乐', '极大值': 2193, '极小值': 1293 },
        ]
      },
      grid: {
        top: 30,
        bottom: 20
      }
    }
  },

  components: {
    VeLine
  },


  mounted() {},

  methods: {
    changeTime (time) {
       this.currentTime = time
    }
  }

}

</script>
<style lang='scss' scoped>
.jizhi{
   .title{
        height:30px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        border-left:solid 8px rgb(31, 156, 255);
        padding-left:10px;
        margin-bottom:5px;    
        .title_name{
          font-size:16px;
        }
   }
  .time{
    .active1{
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
</style>