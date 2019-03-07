<template>
  <div class="weihu">
    <div class="nav">
        <suber @change="changeComponent" />
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
const shuiza = () => import ('./components/shuiza.vue')
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

  methods: {
    changeComponent (type) {
       switch (type) {
         case 'shuiku':
         this.component = shuiku
         break
         case 'shuiza':
         this.component = shuiza
         break
       }
    }
  }

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