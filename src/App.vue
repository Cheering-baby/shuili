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
  }
}
</script>

<style lang="scss">
html,body{
   width:100%;
   height:100%;
}
.app{
   width:100%;
   height:100%;
   position:relative;
   .container{
     width:100%;
     position:absolute;
     top:60px;
     left:0;
     bottom:0;
   }
}

</style>
