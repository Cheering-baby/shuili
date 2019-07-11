<!--  -->
<template>
  <div content>
    <Nav @changeCondition="change"/>
    <showimg :speed="speed" :url="url" />
  </div>
</template>

<script>
import Nav from "./components/leida/nav.vue";
import showimg from "./components/leida/showimg.vue";
export default {
  data() {
    return {
      url: "http://imgapi.istrongcloud.com:8025/images/radar/single/fj_fuzhou/3",
      speed: 1000
    };
  },

  components: {
    Nav,
    showimg
  },

  computed: {},

  // mounted: {},

  methods: {
    change(laiyuan,type, time, speed) {
      if(laiyuan === '单站雷达图')laiyuan = 'single'
      if(type === '福建福州')type = 'fj_fuzhou'
      if(type === '华南雷达云图')type = 'huanan'
      if(time === '3小时')time = 3
      if(speed === '1秒')speed = 1000
      console.log(laiyuan, time, speed)
      this.speed = speed;
      if (laiyuan === 'single') {
        this.url = 'http://imgapi.istrongcloud.com:8025/images/radar/single/' + type +'/' + time
      } else if (laiyuan === 'mingle') {
        // this.url = 'http://imgapi.istrongcloud.com:8025/images/radar/single/' + 'huanan' +'/' + time
        this.url = 'http://imgapi.istrongcloud.com:8025/images/radar/mingle/'+ type +'/' + time
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.weixin {
  width: 100%;
  height: 100%;
}
</style>