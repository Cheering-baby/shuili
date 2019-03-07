<template>
  <div class="tide">
    <Head title="潮汐预报" />
    <div class="address">
        <div class="text" v-for="item in address" :key="item.stcd" :class="{active: item.stcd === currentAddress }" @click="changeAddress(item)">{{item.text}}</div>
    </div>
    <ve-line :data="chartData" :mark-point="markPoint" :legend-visible="false" :colors="colors" :grid="grid" height="180px"></ve-line>
  </div>
</template>

<script>
import Vue from 'vue'
import VeLine from 'v-charts/lib/line'
import 'echarts/lib/component/markPoint'
import Head from '@/components/head/head.vue'
export default {
  name: 'tide',
  data () {
    this.markPoint = {
    data: [
        {
        name: '最大值',
        type: 'max'
        },
        {
        name: '最小值',
        type: 'min'
        }        
    ]
    }
    this.colors = ['#1FA5FF'],
    this.grid = {
      top: 30,
      bottom: 15
    }    
    return {
        address:[
            {text:'江阴', stcd:'1001',data:''},
            {text:'琯头', stcd:'1002',data:''},
            {text:'梅花', stcd:'1003',data:''},
            {text:'湄洲', stcd:'1004',data:''},
            {text:'崇武', stcd:'1005',data:''},
        ],
        currentAddress: '1001',
        chartData: {
          columns: ['时间', '潮高'],
          rows: [
            { '时间': '00', '潮高': -50 },
            { '时间': '01', '潮高': -80 },
            { '时间': '02', '潮高': -100 },
            { '时间': '03', '潮高': -85 },
            { '时间': '04', '潮高': -60 },
            { '时间': '05', '潮高': -20 },
            { '时间': '06', '潮高': 10 },
            { '时间': '07', '潮高': 50 },
            { '时间': '08', '潮高': 100 },
            { '时间': '09', '潮高': 120 },
            { '时间': '10', '潮高': 100 },
            { '时间': '11', '潮高': 80 },
            { '时间': '12', '潮高': 60 },
            { '时间': '13', '潮高': 30 },
            { '时间': '14', '潮高': 0 },
            { '时间': '15', '潮高': -20 },
            { '时间': '16', '潮高': -40 },
            { '时间': '17', '潮高': -80 },
            { '时间': '18', '潮高': -90 },
            { '时间': '19', '潮高': -40 },
            { '时间': '20', '潮高': -10 },
            { '时间': '21', '潮高': 20 },
            { '时间': '22', '潮高': 40 },
            { '时间': '23', '潮高': 60 },
          ]
        }
    }
  },

  components: {
    VeLine,
    Head
  },


  mounted() {},

  methods: {
      changeAddress (item) {
          this.currentAddress = item.stcd
      }
  }

}

</script>
<style lang='scss' scoped>
.tide{
    width:400px;
    .address{
        margin-top: 5px ;
        display:flex;
        .text{
            text-align:center;
            height:25px;
            line-height:25px;
            width:60px;
            cursor:pointer;
        }
        .active{
            color:#fff;
            background:rgb(31, 156, 255);
        }
    }
}
</style>