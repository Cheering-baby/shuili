<template>
  <div class="typhoon">
    <div class="map">
      <div class="control">
        <button @click="change">切换图源</button>
      </div>
      <dmap
        @init="init"
        :center="[119.3,26.08333]"
        :zoom="9"
        provider="GaodeMap.Normal"
        style="width:100%;"
      />
    </div>
    <div class="bar" ref="bar">
      <Bar @isShow="show"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
import Bar from "./components/tianqi/bar.vue";
import move from "./components/move.js";
Vue.use(dmap);
let layer;
export default {
  name: "typhoon",
  data() {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      data: [],
      fuzhou: []
    };
  },

  components: { Bar },
  created() {
    this.getFuzhou()
  },
  mounted() {
    this.$store.commit('increment')
    // console.log(this.$store.state.count)
  },
  watch: {
    fuzhou: function() {
    }
  },
  methods: {
    init(map) {
      this.$Axios.get("/public/weather.json").then(req => {
        // console.log(req.data);
        let data = req.data.data;
        layer = this.map.layer();
        layer.addPoints(data, data => {
          return {
            feature: {
              src: "public/img/zb.png"
            },
            tooltip: {
              zoom: 1,
              text: "{cityname}<br/>{now_t}°C&nbsp;{wind_d}{next_wind}",
              direction: "top"
            }
          };
        });
      });
    },
    init2(map) {
      let data = this.fuzhou
      layer = this.map.layer();
      layer.addPoints(data, data => {
        // console.log(data)
        let tem = data.today.tem + '°C '
        let feng = data.today.win + '' + data.today.win_speed
        return {
          feature: {
            src: "public/img/zb.png"
          },
          tooltip: {
            zoom: 1,
            text: "{cityZh}<br/>" + tem + feng,
            direction: "top"
          }
        };
      });
    },
    change: function() {
      this.toggle = !this.toggle;
      this.map.setProvider(
        this.toggle
          ? ["Tianditu.Normal", "Tianditu.Normal_A"] //天地图
          : ["GaodeMap.Satellite", "GaodeMap.Satellite_A"] //高德地图
      );
    },
    show(type) {
      console.log(type);
      if (type === true) {
        move.startMove(this.$refs.bar, "right", 5);
      } else {
        move.startMove(this.$refs.bar, "right", -430);
      }
    },
    getFuzhou() {
      this.$Axios.get("/public/weather2.json").then(req => {
        // console.log(req.data.data);
        this.fuzhou = req.data.data.map(data => {
          this.$Axios
            .get("https://www.tianqiapi.com/api/?version=v6", {
              params: {
                cityid: data.id
              }
            })
            .then(req => {
              // console.log(req)
              data.today = req.data;
            });
          return data;
        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.typhoon {
  height: 100%;
  position: relative;
  overflow: hidden;
  .map {
    height: 100%;
    position: relative;
    .control {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0;
      left: 0;
      height: 50px;
      right: 0;
      // background-color:#000;
      z-index: 900;
      button {
        margin-left: 10px;
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
    background-color: rgb(246, 249, 254);
    border-radius: 10px;
  }
}
</style>