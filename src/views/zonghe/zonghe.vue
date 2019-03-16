<template>
  <div class="zonghe">
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

import ditu from '@/components/ditu/ditu.vue'
import suber from '@/components/sub/subLine.vue'

const shuiku = () => import ('./components/shuiku.vue')
const shuiza = () => import ('./components/shuiza.vue')
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


  mounted () {

  },

  methods: {
    changeComponent (type) {
      const item = [
        {name: 'shuiku', component: shuiku},
        {name: 'shuiza', component: shuiza}
      ]
      let now = item.filter(f => f.name === type)
      this.component = now[0].component
      // console.log(now)
    }
  }

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