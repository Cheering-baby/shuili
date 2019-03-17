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
const bhdx = () => import ('./components/bhdx.vue')
const bzd = () => import ('./components/bzd.vue')
const dwd = () => import ('./components/dwd.vue')
const wf = () => import ('./components/wf.vue')
const cwz = () => import ('./components/cwz.vue')
const sxxx = () => import ('./components/sxxx.vue')
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
        {name: 'shuiza', component: shuiza},
        {name: 'bhdx', component: bhdx},
        {name: 'bizhaidian', component: bzd},
        {name: 'dwd', component: dwd},
        {name: 'wf', component: wf},
        {name: 'cwz', component: cwz},
        {name: 'sxxx', component: sxxx}
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