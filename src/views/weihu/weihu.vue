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
const bizhaidian = () => import ('./components/bizhaidian.vue')
const fxwz = () => import ('./components/fxwz.vue')
const wf = () => import ('./components/wf.vue')
const dwd = () => import ('./components/dwd.vue')
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
      const item = [
        {name: 'shuiku', component: shuiku},
        {name: 'shuiza', component: shuiza},
        {name: 'bizhaidian', component: bizhaidian},
        {name: 'fxwz', component: fxwz},
        {name: 'wf', component: wf},
        {name: 'dwd', component: dwd},
      ]
      let now = item.filter(f => f.name === type)
      this.component = now[0].component
      // console.log(now)
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