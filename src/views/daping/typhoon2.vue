<template>
  <div class="typhoon">
    <div class="map">
      <div class="control">
      <button  @click="change">切换图源</button>
      <button  @click="clear">清除</button>
      <!-- <button  @click="remove">移除</button> -->
      </div>
      <dmap
        @init="init"
        :center="[120,20]"
        :zoom="4.5"
        provider="GaodeMap.Normal"
        style="width:100%;"
      />
    </div>
    <div class="bar" ref="bar">
      <Bar @transData="addData" @isShow="show" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
import Bar from "./components/typhoon/bar.vue";
import move from './components/move.js'
Vue.use(dmap);
let layer;
export default {
  name: "typhoon",
  data() {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      title: "台风专题",
      showBig: false,
      height: 800,
      itemHeight: 0,
      itemContent: [
        {
          title: "气压分析",
          columns: ["hour", "windpower"],
          data: [],
          formatte: "Pa"
        },
        {
          title: "风力分析",
          columns: ["hour", "windspeed"],
          data: [],
          formatte: "m/s"
        },
        {
          title: "移速分析",
          columns: ["hour", "movingspeed"],
          data: [],
          formatte: "km/h"
        }
      ],
      data: [],
      alarmDate: {
        g24: [[105, 0], [113, 4.5], [119, 11], [119, 18], [127, 22], [127, 34]],
        s24: {
          color: "#0000FF",
          opacity: 1,
          weight: 1,
          dashArray: "10,3",
          interactive: false
        },
        g48: [[105, 0], [120, 0], [132, 15], [132, 34]],
        s48: {
          color: "#FFFF00",
          opacity: 1,
          weight: 1,
          dashArray: "10,3",
          interactive: false
        }
      }
    };
  },

  components: { Bar },
  created() {},
  mounted() {
    // console.log(123);
  },
  watch: {},
  methods: {
    init(map) {
      // this.$Axios
      //   .get(
      //     "http://192.168.118.226:9831/webapi/api/v1/typhoon?forecast=true&history=true&tfbh=201902"
      //   )
      //   .then(res => {
      //     let data = res.data.data[0];
      //     console.log(data)
          layer = this.map.layer();
          // layer.addTyphoon(data);
          layer.addAlarmLines(this.alarmDate);
        // });
    },
    change: function() {
      this.toggle = !this.toggle;
      this.map.setProvider(
        this.toggle
          ? ["Tianditu.Normal", "Tianditu.Normal_A"] //天地图
          : ["GaodeMap.Satellite", "GaodeMap.Satellite_A"] //高德地图
      );
    },
    addData(data) {
      console.log(data)
      layer.addTyphoon(data);
    },
    /**
     * 直接清除
     */
    clear() {
      layer.clear();
      layer.addAlarmLines(this.alarmDate);
    },
    /**
     * 单个移除
     */
    remove() {
      let marker = layer.addTyphoon().pop();
      marker && marker.remove();
    },
    show(type) {
       console.log(type)
       if(type === true){
           move.startMove(this.$refs.bar,'right',5)
       }else{
           move.startMove(this.$refs.bar,'right',-430)
       }
    }

  }
};
</script>
<style lang='scss' scoped>
.typhoon {
  height: 100%;
  position: relative;
  overflow:hidden;
  .map {
    height: 100%;
    position: relative;
    .control{
      position:absolute;
      display:flex;
      align-items:center;
      top:0;
      left:0;
      height:50px;
      right:0;
      // background-color:#000;
      z-index:900;
      button{
        margin-left:10px;
      }
    }
  }
  .bar {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 430px;
    bottom: 100px;
    z-index: 999;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>