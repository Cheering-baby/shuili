<template>
  <div class="toubu">
     <div class="time">{{date}}</div>
     <div class="title">水利防汛信息展示平台</div>
     <div class="nav">
       <div class="nav1" @click="zonghe(1)">
         <div class="img" style="background:url(/public/img/zhuye.png) no-repeat;background-size:100% 100%;"></div>
         <div class="text">大屏展示</div>
       </div>
       <div class="nav1" @click="zonghe(2)" >
         <div class="img" style="background:url(/public/img/zonghe.png) no-repeat;background-size:100% 100%;"></div>
         <div class="text">综合展示</div>
       </div>
       <div class="nav1" @click="zonghe(3)">
         <div class="img" style="background:url(/public/img/weihu.png) no-repeat;background-size:100% 100%;"></div>
         <div class="text">数据维护</div>
       </div>
     </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      date: new Date().toLocaleString()
    }
  },

  components: {},


  mounted () {
      this.timer = setInterval(() => {
          this.date = new Date().toLocaleString()
      })
  },

  methods: {
    zonghe (type) {
      switch(type) {
        case 1:
        this.$router.push('/')
        break
        case 2:
        this.$router.push('/zonghe')
        break
        case 3:
        this.$router.push('/weihu')
        break        
      }
    }
  }

}

</script>
<style lang='scss' scoped>
.toubu{
    height:60px;
    background-color: rgb(31, 144, 242);
    display:flex;
    align-items: center;
    justify-content: space-between;
    color:#fff;
    padding:0 30px;
    .time{
        font-size:20px;
    }
    .title{
        font-size:24px;
    }
    .nav{
      display:flex;
      align-items: center;
      // height:40px;
      .nav1,.nav2{
           cursor: pointer;
        }
      div{
        display: flex;
        .img{
          margin-left:40px;
          width:20px;
          height:20px;
        }
        .text{
          margin-left:2px;
        }
      }
    }
}
</style>