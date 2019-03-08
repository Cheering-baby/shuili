<template>
  <div class="daping">
    <div class="left">
      <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ts&skin=orange" frameborder="0" width="500" height="200" allowtransparency="true" color="000000"></iframe>
      <jizhi />
      <yuliang />
    </div>
    <div class="middle">
        <typhoon />
    </div>
    <div class="right">
        <tide />
        <popup />
        <popup title="雷达云图" />    
    </div>
  </div>
</template>

<script>
import jizhi from "./jizhi.vue";
import yuliang from "./yuliang.vue";
import tide from "./tide.vue";
import popup from "@/components/popup/popup.vue";
import typhoon from "./typhoon.vue";
export default {
  name: "daping",
  data() {
    return {};
  },

  components: {
    jizhi,
    yuliang,
    tide,
    popup,
    typhoon
  },

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.daping {
  display: flex;
  width: 100%;
  height:100%;
  flex-flow: row nowrap;
  .left{
    width: 500px;
    // background: rgb(180,180,180);
  }
  .right{
    width: 400px;
    // background: rgb(210,210,210);
  }
  .middle {
    flex-grow: 1; //决定如何分配剩余空间
    // background: rgb(150,150,150);
  }
}
</style>