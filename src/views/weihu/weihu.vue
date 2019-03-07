<template>
  <div class="weihu">
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
import suber from '@/components/sub/subLine.vue'
const shuiku = () => import ('./components/shuiku.vue')
export default {
  name: 'weihu',
  data () {
    return {
       component: shuiku
    }
  },

  components: {
      suber
  },


  mounted () {},

  methods: {}

}

</script>
<style lang='scss' scoped>
.weihu{
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