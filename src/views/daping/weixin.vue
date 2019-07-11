<!--  -->
<template>
  <div content>
    <Nav @changeCondition="change"/>
    <showimg :speed="speed" :url="url" />
  </div>
</template>

<script>
import Nav from "./components/weixin/nav.vue";
import showimg from "./components/weixin/showimg.vue";
export default {
  data() {
    return {
      url: "http://imgapi.istrongcloud.com:8025/images/cloud/fy2/12",
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
    change(laiyuan, time, speed) {
      if(laiyuan === '风云二号')laiyuan = 2
      if(time === '12小时')time = 12
      if(speed === '1秒')speed = 1000
      console.log(laiyuan, time, speed)
      this.speed = speed;
      if (laiyuan === 2) {
        if (time === 12) {
          this.url = "http://imgapi.istrongcloud.com:8025/images/cloud/fy2/12";
        } else {
          this.url = "http://imgapi.istrongcloud.com:8025/images/cloud/fy2/24";
        }
      } else if (laiyuan === 4) {
        if (time === 12) {
          this.url = "http://imgapi.istrongcloud.com:8025/images/cloud/fy4a/colour/12";
        } else {
          this.url = "http://imgapi.istrongcloud.com:8025/images/cloud/fy4a/colour/24";
        }
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