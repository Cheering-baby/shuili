<template>
  <div class="daping">
      <div class="left">
          <div class="top">
            <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ts&skin=orange" frameborder="0" width="500" height="200" allowtransparency="true" color="000000"></iframe>
          </div>
          <jizhi />
          <yuliang />
      </div>
      <div class="right">
        <tide />
        <popup />
        <popup title="雷达云图" />
      </div>
      <div class="center">132</div>
  </div>
</template>

<script>
import jizhi from './jizhi.vue'
import yuliang from './yuliang.vue'
import tide from './tide.vue'
import popup from '@/components/popup/popup.vue'
export default {
  name: 'daping',
  data () {
    return {

    }
  },

  components: {
      jizhi,
      yuliang,
      tide,
      popup
  },


  mounted () {},

  methods: {}

}

</script>
<style lang='scss' scoped>
.daping{
    // display:flex;
    // justify-content: space-between;
    width:100%;
    height:100%;
    .left{
      float:left;
      width:500px;
    }
    .right{
      width:400px;
      float:right;
    }
    .center{
      margin-left:500px;
      margin-right:400px;
    }
}
</style>