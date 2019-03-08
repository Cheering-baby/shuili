<template>
  <dmap @init="init1" :center="[120,20]" :zoom="4.8" provider="GaodeMap.Normal"/>
</template>

<script>
import Vue from "vue";
import dmap from "@istrong/dmap";
Vue.use(dmap);
export default {
  data() {
    return {};
  },

  components: {},

  mounted() {},

  methods: {
    init1(map) {
      this.$Axios
        .get(
          "http://192.168.118.226:9831/webapi/api/v1/typhoon?forecast=true&history=true&tfbh=201902"
        )
        .then(res => {
          let data = res.data.data[0];
          let layer = this.map.layer();
          layer.addTyphoon(data);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>