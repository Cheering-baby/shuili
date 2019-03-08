<template>
  <div style="width:100%;">
      <el-menu
        default-active="3-1"
        class="el-menu-vertical-demo"
        style="width:200px;"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>风险信息</span>
          </template>
            <el-menu-item index="1-1" @click="changeItem('dwd')">低洼地</el-menu-item>
            <el-menu-item index="1-2" @click="changeItem('wf')">危房</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>气象信息</span>
          </template>
            <el-menu-item index="2-1">天气预报</el-menu-item>
            <el-menu-item index="2-2">降雨预报</el-menu-item>
        </el-submenu>        
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>工情信息</span>
          </template>
            <el-menu-item index="3-1" @click="changeItem('shuiku')">水库信息</el-menu-item>
            <el-menu-item index="3-2" @click="changeItem('shuiza')">水闸信息</el-menu-item>
        </el-submenu>        
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-bell"></i>
            <span>应急抢险</span>
          </template>
            <el-menu-item index="4-1" @click="changeItem('fxwz')">防汛物资</el-menu-item>
            <el-menu-item index="4-2" @click="changeItem('bizhaidian')">避灾点</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
export default {
  name: 'subLine',
  data () {
    return {
     defaultOpen: []
    }
  },

  components: {},


  mounted () {},

  methods: {
    changeItem (type) {
       this.$emit('change', type)
    }
  }

}

</script>
<style lang='scss' scoped>

</style>