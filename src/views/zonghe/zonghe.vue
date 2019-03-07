<template>
  <div class="zonghe">
    <div class="nav">
        <suber />
    </div>
    <div class="content">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>

import ditu from '@/components/ditu/ditu.vue'
import suber from '@/components/sub/subLine.vue'

const shuiku = () => import ('./components/shuiku.vue')
export default {
  name: 'zonghe',
  data () {
    return {
       component: shuiku
    }
  },

  components: {
      ditu,
      suber
  },


  mounted () {},

  methods: {}

}

</script>
<style lang='scss' scoped>
.zonghe{
    height:100%;
    .nav{
        width:200px;
        height:100%;
        // background-color:red;
        float:left;
    }
    .content{
        margin-left:200px;
        height:100%
    }
}
</style>