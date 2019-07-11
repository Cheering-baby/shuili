<!--  -->
<template>
  <div class="bar1">
    <i class="iconfont icon-zhankai icon" @click="toggle" :class="{hide:show === false}"></i>
    <div class="today">
      <div class="line1 line">{{today.city}}天气&nbsp;中央气象台&nbsp;{{today.update_time}}发布</div>
      <div class="line2 line">
        <span style="font-size:35px;">{{today.tem}}°C</span>
        &nbsp;{{today.wea}}
      </div>
      <div class="line3 line">
        <!-- <div class="des iconfont icon-fengsu">&nbsp;{{today.win}}{{today.win_speed}}</div> -->
        <div class="des iconfont icon-fengsu">&nbsp;东风{{today.win_speed}}</div>
        <div class="des iconfont icon-kongqishidu">&nbsp;空气质量：{{today.air}}&nbsp;{{today.air_level}}</div>
        <div class="des iconfont icon-thermometer_icon">&nbsp;相对湿度：{{today.humidity}}</div>
      </div>
      <div class="line4">{{today.air_tips}}</div>
    </div>
    <div title class="seven">7天天气预报</div>
    <ve-line :data="chartData" :loading="loading" :settings="chartSettings" :extend="chartExtend" height="350px"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'v-charts/lib/style.css'
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        'tem1': '最高温',
        'tem2': '最低温',
        'gap': '温差'
      }
    },
    this.chartExtend = {
      xAxis:{
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          interval: 0,
          // rotate: 45
        }
      },
      yAxis:{
        type:'value',
        axisLabel:{
          formatter: '{value}°C'
        }
      },
      // series: [
      //   {
      //     name: 'tem1',
      //     type: 'line',
      //     emphasis:{
      //       smooth: false
      //     }
      //   },
      //   {
      //     name: 'tem2',
      //     type: 'line',
      //     emphasis:{
      //       smooth: false
      //     }
      //   },
      //   {
      //     name: 'gap',
      //     type: 'line',
      //     emphasis:{
      //       smooth: false
      //     }
      //   }
      // ]
      series: {
        label:{
          normal:{
            show:true,
            formatter: function(params) {
                // console.log(params)
                return params.data[1] + '°C'
            }
          }
        }
      },
      tooltip: {
        // formatter: function(params) {
        //   console.log(params)
        // }
      }
    }
    return {
      show: true,
      today:{},
      seven: [],
      data:[],
      chartData:{
        columns: ['day','tem1','tem2','gap'],
        rows: []
      },
      loading: true
    };
  },
  watch: {},
  filters: {
     formatTime: function(val) {
       let time = val.replace('T',' ')
       return time
     }
  },
  components: {
    VeLine
  },

  computed: {},
  created(){
    this.getToday()
    this.getSeven()
  },
  mounted() {

  },

  methods: {
    toggle() {
      this.show = !this.show
      // console.log('toggle')
      this.$emit('isShow',this.show)
    },
    getToday() {
      this.$Axios.get('https://www.tianqiapi.com/api/?version=v6&cityid=101230101')
      .then(req => {
        // console.log(req.data)
        this.today = req.data
      })
    },
    getSeven() {
      this.$Axios.get('https://www.tianqiapi.com/api/?version=v1&cityid=101230101')
      .then(req => {
        // console.log(req.data.data)
        let data = req.data.data.map(data =>{
          data.tem1 = data.tem1.replace('℃','')
          data.tem2 = data.tem2.replace('℃','')   
          // let tem1 = data.tem1.replace('℃','')
          // let tem2 = data.tem2.replace('℃','')
          // console.log(tem1, tem2)
          data.day = data.day.substr(0,data.day.length - 4)
          // console.log(data.day)
          data.gap = data.tem1 - data.tem2               
          return data
        })
        this.chartData.rows = data
        this.loading = false
      })
    }
  }
};
</script>
<style>
</style>
<style lang='scss' scoped>
.bar1 {
  // padding: 10px;
  // overflow-y: scroll;
  height: calc(100% - 20px);
  .icon {
    position: absolute;
    top: 10px;
    left: -40px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 50%;
    // border:1px solid rgb(165, 164, 164);
    cursor: pointer;
    text-align: center;
  }
  .hide {
    transform: rotate(-180deg);
  }
  .icon:hover {
    color: rgb(31, 144, 242);
  }
  .today {
    width: calc(100% - 20px);
    height: 150px;
    padding: 10px;
    border-radius: 10px;
    background: url(/public/img/tq.jpg) no-repeat;
    background-size: 150% 150%;
    color: #fff;
    // overflow:hidden;
    .line {
      margin-bottom: 10px;
    }
    .line3 {
      display: flex;
      align-items: center;
      .des {
        margin-right: 10px;
        // height:30px;
      }
    }
  }
  .seven {
    margin-top: 5px;
  }
}
</style>