<template>
  <div class="analysis" ref="analysis">
    <Head :title="item.title"/>
    <div class="content">
      <ve-line :data="chartData" :height="chartHeight + 'px'" :grid="grid" :legend-visible="false" :settings="chartSettings" :yAxis="yAxis"></ve-line>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/head.vue";
import VeLine from "v-charts/lib/line.common";
export default {
  props: {
    itemHeight: Number,
    columns: Array,
    item: Object
  },
  data() {
    return {
      chartHeight: 0,
      chartData: {
        columns: [],
        rows: [
          //   { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          //   { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          //   { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          //   { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          //   { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          //   { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      grid: {
        top: 10,
        bottom: 10
      },
      chartSettings: {
        labelMap: {
          windpower: "气压",
          windspeed: "风力",
          movingspeed: "风速"
        }
      },
      yAxis: {
          type: 'value',
          axisLabel: {
              formatter: '{value}' + this.item.formatte 
          }
      }
    };
  },

  components: {
    Head,
    VeLine
  },
  created() {},
  mounted() {
    // console.log(this.$refs.analysis.offsetHeight)
    setTimeout(() => {
      this.chartHeight = this.itemHeight - 25;
      this.chartData.columns = this.item.columns;
      this.$Axios
        .get(
          "http://192.168.118.226:9831/webapi/api/v1/typhoon/typhoon_analysic?tfbhs=201902"
        )
        .then(res => {
          console.log(res.data.data[0].datalist);
          this.chartData.rows = res.data.data[0].datalist;
          //   for (let i = 0; i < 3; i++) {
          //     this.itemContent[i].data = this.data;
          //   }
        });
    }, 0);
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>