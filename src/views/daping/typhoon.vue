<template>
  <div class="typhoon">
    <div style="height:100%;">
      <div class="top">
        <div class="title">{{title}}</div>
        <div class="fangda" @click="change('fangda')"></div>
      </div>
      <dmap @init="init" :center="[120,20]" :zoom="4.8" provider="GaodeMap.Normal"/>
    </div>
    <transition name="fade">
      <div class="typhoonBig" v-if="showBig">
            <div class="title_big">
                <div class="title">{{title}}</div>
                <div class="suoxiao" @click="change('suoxiao')"></div>                
            </div>        
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
Vue.use(dmap);
export default {
  name: "typhoon",
  props: {
    height:{
      type: Number,
      default: function() {
        let now = document.documentElement.clientHeight || document.body.clientHeight
        return now - 65
      }
    }
  },
  data() {
    return {
        title: '台风',
        showBig: false
    };
  },

  components: {},

  mounted() {},

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
      console.log('done')
    }
  }
};
</script>
<style lang='scss' scoped>
.typhoon {
  width: 100%;
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
  .typhoonBig{
    width:100%;
    position:fixed;
    top:60px;
    left:0;
    bottom:0;
    background: #99a9bf;
    z-index:2019;
    color:#fff;
    .title_big{
        display:flex;
        justify-content: space-between;
        align-items:center;
        border-left:solid 8px rgb(31, 156, 255);
        padding-left: 10px; 
        .title{
            font-size:20px;
        }
        .suoxiao{
            width:32px;
            height:30px;
            background:url(/public/img/suoxiao.png) top 8px left 0px no-repeat;
            background-size:60% 60%;
            cursor:pointer;
        }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>