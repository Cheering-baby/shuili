<template>
  <div style="color:#000;">
    <Head title="历史台风影响统计" />
    <div class="history" >
      <ve-histogram
        :data="chartData"
        :settings="chartSettings"
        height="250px"
        width="330px"
        :grid="grid"
      ></ve-histogram>
      <div class="box">
        <div class="total" v-for="item in boxItem" :key="item.number">
          <div class="text">{{item.text}}</div>
          <div class="number"><span style="font-size:20px;">{{item.number}}</span>个</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VeHistogram from "v-charts/lib/histogram.common.js";
import Head from '@/components/head/head.vue'
export default {
  data() {
    return {
      chartData: {
        columns: ["year", "total", "fztotal"],
        rows: [
          // { 日期: 1, 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          // { 日期: 2, 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          // { 日期: 5, 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          // { 日期: 10, 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          // { 日期: 20, 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          // { 日期: 22, 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      chartSettings: {
        labelMap: {
          total: "总量",
          fztotal: "影响福州个数"
        },
        xAxisType: "value"
      },
      grid: {
        top: 30,
        bottom: 10
      },
      boxItem: [
        {text: '历史年均台风总量', number: 24},
        {text: '历史年均影响福州个数', number: 1},        
      ]
    };
  },
  components: {
    VeHistogram,
    Head
  },
  mounted() {
    this.$Axios
      .get("http://192.168.118.226:9831/webapi/api/v1/typhoon/affect_census")
      .then(res => {
        let data = res.data.data;
        console.log(data);
        this.chartData.rows = data.affectlist;
      });
  }
};
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  color:#000;
  .box {
    flex-grow: 1;
    .total {
      height: 100px;
      border: 2px solid rgb(90, 177, 239);
      margin: 10px 10px 0 0;
      .text,.number{
        text-align:center;
      }
      .text{
        padding:10px;
      }
    }
  }
}
</style>
