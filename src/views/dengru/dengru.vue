<template>
  <div class="dengru">
       <div class="center">
         <div class="title">水利防汛信息展示平台</div>
         <div class="zhanghao">
           <div class="text">账号</div>
           <el-input v-model="zhanghao" placeholder="请输入账号" suffix-icon="el-icon-tickets"></el-input>
         </div>
         <div class="mima">
           <div class="text">密码</div>
           <el-input v-model="password" placeholder="请输入账号" suffix-icon="el-icon-tickets" type="password"></el-input>      
         </div>
         <div class="ru">
           <el-button type="primary" @click="dengru()">登入</el-button>
         </div>
       </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Input,Button } from 'element-ui'
Vue.use(Input)
Vue.use(Button)
export default {
  name: 'dengru',
  data () {
    return {
       zhanghao: '',
       password: ''
    }
  },

  components: {},


  mounted () {},

  methods: {
    dengru () {
      this.$router.push('/')
    }
  }

}

</script>
<style>
.el-button--primary{
  display:block;
  width:100%;
}
</style>

<style lang='scss' scoped>
.dengru{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  // background-color:rgb(110,100,100);
  background:url(/public/img/bg.jpg) no-repeat;
  background-size:100% 100%;
  .center{
    width: 400px;
    height: 300px;
    background: #fff;
    position:absolute;
    left:50%;    /* 定位父级的50% */
    top:50%;
    transform: translate(-50%,-60%); /*自己的50% */
    .title{
      height:30px;
      line-height:30px;
      text-align:center;
      color:#1F90F2;
      font-size:25px;
      margin:20px 0;
      margin-top:40px;
    }
    .zhanghao,.mima{
      display:flex;
      align-items: center;
      margin:0 40px;
      margin-bottom:20px;
      .text{
        width:40px;
        color:rgb(133, 144, 166);
        margin-right:10px;
      }
    }
    .ru{
      margin:0 40px;
    }
  }
}
</style>