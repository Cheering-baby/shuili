<template>
  <div class="typhoon">
    <div class="map">
      <div class="control">
        <!-- <button @click="change">切换图源</button> -->
      </div>
      <dmap
        @init="init"
        :center="[120,20]"
        :zoom="2"
        provider="GaodeMap.Normal"
        style="width:100%;"
        :zoomControl="true"
      />
    </div>
    <!-- <div class="bar" ref="bar">
      <Bar  @isShow="show" />
    </div>-->
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
      data: []
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
      this.loading = this.$loading({background:'rgba(0, 0, 0, 0.8)'})
      this.$Axios
        .get("https://tf.istrongcloud.com/data/gfs/gfs.json")
        .then(req => {
            console.log(req)
            let data = req.data
          let layer = map.layer();
          for (let key in data) {
            layer.addWindy(data[key]);
          }
          setTimeout(() => {
            this.loading.close()
          },2000)
          
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
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>