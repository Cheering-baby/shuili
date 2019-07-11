<template>
  <div class="typhoon">
    <div class="top">
      <div class="title">{{title}}</div>
      <div class="fangda" @click="change('fangda')"></div>
    </div>
    <div class="map" :style="{height:height + 'px'}">
      <dmap @init="init" :center="[120,20]" :zoom="4.8" provider="GaodeMap.Normal" style="width:100%;" />
    </div>
    <transition name="fade">
      <div class="typhoonBig" v-if="showBig">
        <div class="title_big">
          <div class="title">{{title}}</div>
          <div class="suoxiao" @click="change('suoxiao')"></div>
        </div>
        <div class="content">
          <div class="map">
            <bigMap/>
          </div>
          <div class="chart" ref="chart">
            <history/>
            <div class="bottom" ref="bottom">
              <div class="item" v-for="item in itemContent" :key="item.title">
                <item :itemHeight="itemHeight" :item="item"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
import bigMap from "./dmap.vue";
import history from "./components/history.vue";
import item from "./components/analysis.vue";
Vue.use(dmap);
export default {
  name: "typhoon",
  data() {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      title: "台风专题",
      showBig: false,
      height: 0,
      itemHeight: 0,
      itemContent: [
        { title: "气压分析", columns: ["hour", "windpower"], data: [], formatte: 'Pa' },
        { title: "风力分析", columns: ["hour", "windspeed"], data: [], formatte: 'm/s' },
        { title: "移速分析", columns: ["hour", "movingspeed"], data: [], formatte: 'km/h' }
      ],
      data: []
    };
  },

  components: {
    bigMap,
    history,
    item
  },
  created() {
    // let now = document.documentElement.clientHeight || document.body.clientHeight
    this.height = this.winH - 95;
  },
  mounted() {
    window.onresize = () => {
      // let now = document.documentElement.clientHeight || document.body.clientHeight
      this.height = this.winH - 95;
    };
  },
  watch: {
    showBig: function(val) {
      setTimeout(() => {
        if(val === true){
          this.itemHeight = Math.floor(this.$refs['bottom'].offsetHeight / 3);
          console.log(123)   
        }
      },200)
    }
  },
  methods: {
    init(map) {
      this.$Axios
        .get(
          "http://192.168.118.226:9831/webapi/api/v1/typhoon?forecast=true&history=true&tfbh=201902"
        )
        .then(res => {
          let data = res.data.data[0];
          let layer = this.map.layer();
          layer.addTyphoon(data);
        });
    },
    change(type) {
      if (type === "fangda") {
        this.showBig = true;
      }
      if (type === "suoxiao") {
        this.showBig = false;
      }
      console.log("done");
    }
  }
};
</script>
<style lang='scss' scoped>
.typhoon {
  height: 100%;
  .top {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: solid 8px rgb(31, 156, 255);
    padding-left: 10px;
    margin-bottom: 5px;
    .title {
      font-size: 16px;
    }
    .fangda {
      width: 32px;
      height: 30px;
      background: url(/public/img/fangda.png) top 8px left 0px no-repeat;
      background-size: 60% 60%;
      cursor: pointer;
    }
  }
  .typhoonBig {
    width: 100%;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    background: #99a9bf;
    z-index: 2019;
    color: #fff;
    display: flex;
    flex-direction: column;
    .title_big {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: solid 8px rgb(31, 156, 255);
      padding-left: 10px;
      .title {
        font-size: 20px;
      }
      .suoxiao {
        width: 32px;
        height: 30px;
        background: url(/public/img/suoxiao.png) top 8px left 0px no-repeat;
        background-size: 60% 60%;
        cursor: pointer;
      }
    }
    .content {
      flex-grow: 1;
      display: flex;
      .map {
        flex-grow: 1;
        background-color: rgb(150, 150, 150);
      }
      .chart {
        width: 450px;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .bottom {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          color: #000;
          .item {
            flex-grow: 1;
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>