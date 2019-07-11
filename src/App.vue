<template>
  <div class="app">
    <toubu />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import toubu from './views/toubu.vue'
export default {
  name: 'app',
  components: {
    toubu
  },
  props:{
    height:{
      type: Number
    }
  }
}
</script>

<style lang="scss">
@import './assets/tools.css';
@import './assets/style.css';
html,body{
   width:100%;
   height:100%;
}
.app{
   width:100%;
   height:100%;
   position:relative;
  //  display:flex;
  //  flex-direction: column;
   .container{
     width:100%;
     position:absolute;
     top:60px;
     right:0;
     left:0;
     bottom:0;
    //  flex-grow:1;
   }
}

</style>
