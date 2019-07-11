<!--  -->
<template>
  <div class="daping1">
    <Menu @showComponent="showComponent" />
    <div class="content">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>    
  </div>
</template>

<script>
const typhoon = () => import ('./typhoon2.vue')
const weixin = () => import ('./weixin.vue')
const tianqi = () => import ('./tianqi.vue')
const leida = () => import ('./leida.vue')
const fc = () => import ('./fc.vue')
import Menu from './components/menu.vue'
export default {
  data () {
    return {
        component:tianqi
    };
  },

  components: {
      Menu
    },

  computed: {},

  mounted(){},

  methods: {
      showComponent(target) {
          console.log(target)
      const item = [
        {name: 'typhoon', component: typhoon},
        {name: 'weixin', component: weixin},
        {name: 'leida', component: leida},
        {name: 'tianqi', component: tianqi},
        {name: 'fc', component: fc},
      ]
      let now = item.filter(f => f.name === target)
      this.component = now[0].component
      }
  }
}

</script>
<style lang='scss' scoped>
.daping1{
    display:flex;
    height:100%;
    .content{
        flex-grow:1;   
    }
}
</style>