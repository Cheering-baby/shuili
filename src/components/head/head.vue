<template>
  <div class="head" :style="{height: height + 'px',lineHeight: height + 'px',fontSize: fontSize + 'px'}">
     {{title}}
  </div>
</template>

<script>
export default {
  name: 'self-head',
  props: {
     title:{
         type: [String, Number],
         default: '默认标题'
     },
     height:{
         type: Number,
         default: 25
     },
     fontSize:{
         type: Number,
         default: 16
     }
  },
  data () {
    return {

    }
  },

  components: {},


  mounted() {},

  methods: {}

}

</script>
<style lang='scss' scoped>
  .head{
      width:90%;
      border-left:solid 8px rgb(31, 156, 255);
      padding-left: 10px;
  }
</style>