<!--  -->
<template>
  <div ref="searchModule">
     <!-- <div v-for="(item,index) in out" :key="index" v-html="item"></div> -->
     <!-- <div v-for="(item,index) in out" :key="index">{{item}}</div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import searchModule from './searchModule.js'
// import { Input } from 'element-ui'
// Vue.use(Input)
export default {
  name: 'searchModule',
  props: {
     search: Array
  },
  data () {
    return {
        out: []
    }
  },

//   components: {},

//   computed: {},

  mounted() {
    this.out = searchModule.input(this.search)
    // let len = this.out.length
    // for(let i=0;i<len;i++){
    //     this.$refs.searchModule.appendChild(this.out[i])
    //     this.$refs.searchModule.style.fontSize= '36px'
    // }
    // console.log(out)
  },

//   methods: {}
}

</script>

<style lang='scss' scoped>

</style>