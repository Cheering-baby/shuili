<template>
  <div class="dengru">
    <div class="center">
      <div class="title">水利防汛信息化平台</div>
      <div class="zhanghao">
        <div class="text">账号</div>
        <el-input v-model="zhanghao" placeholder="请输入账号" suffix-icon="el-icon-tickets"></el-input>
      </div>
      <div class="mima">
        <div class="text">密码</div>
        <el-input
          v-model="password"
          placeholder="请输入账号"
          suffix-icon="el-icon-tickets"
          type="password"
        ></el-input>
      </div>
      <div class="identify">
        <el-input v-model="syzm" placeholder="请输入验证码"></el-input>
        <div @click="randonNumber()">
        <SIdentify class="yzm" :identifyCode="yzm"  />
        </div>
      </div>
      <div class="ru">
        <el-button type="primary" @click="dengru()">登入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Input, Button } from "element-ui";
import SIdentify from "@/components/identify";
Vue.use(Input);
Vue.use(Button);
export default {
  name: "dengru",
  data() {
    return {
      zhanghao: "",
      password: "",
      syzm: '',
      yzm: ""
    };
  },

  components: {
    SIdentify
  },

  mounted() {


    this.randonNumber()
    // this.generatedCode()
  },

  methods: {
    dengru() {
    // this.$Axios.get('http://localhost:3000/data',{
    //   params:{
    //     user: this.zhanghao,
    //     psw: this.password        
    //   }
    // })
    //   .then((res) => {
    //     console.log(res)
    //   } )
    this.$Axios.post('http://localhost:3000/login', {
        user: this.zhanghao,
        psw: this.password
    })
      .then((res) => {
        console.log(res)
      } )
      .catch(err => {
        console.log(err)
      })
      this.judge()
    },
    randonNumber() {
      let num = ''
      for(var i=0;i<4;i++){
        num += Math.floor(Math.random()*10)
      }
      console.log(num)
      this.yzm = num
    },
    //  generatedCode () {
    //   const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    //   let code = ''
    //   for (let i = 0; i < 4; i++) {
    //     let index = Math.floor(Math.random() * 36)
    //     code += random[index]
    //   }
    //   this.yzm = code
    // },
    judge () {
      if(this.syzm !== this.yzm) {
        this.$message.error('验证码错误')
        return false
      }else{
        this.$message({
          message: '登录成功',
          type: 'success',
          duration: 1000
        });
        setTimeout(()=>{
          this.$router.push('/')
        },1000)
      }
    }
  }
};
</script>
<style>
.el-button--primary {
  display: block;
  width: 100%;
}
.el-button--small.is-round {
  width: 60px;
}
</style>

<style lang='scss' scoped>
.dengru {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // background-color:rgb(110,100,100);
  background: url(/public/img/bg.jpg) no-repeat;
  background-size: 100% 100%;
  .center {
    width: 400px;
    height: 350px;
    background: #fff;
    position: absolute;
    left: 50%; /* 定位父级的50% */
    top: 50%;
    transform: translate(-50%, -60%); /*自己的50% */
    .title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #1f90f2;
      font-size: 25px;
      margin: 20px 0;
      margin-top: 40px;
    }
    .zhanghao,
    .mima {
      display: flex;
      align-items: center;
      margin: 0 40px;
      margin-bottom: 20px;
      .text {
        width: 40px;
        color: rgb(133, 144, 166);
        margin-right: 10px;
      }
    }
    .identify {
      margin: 0 40px;
      margin-bottom: 20px;
      display: flex;
      // align-items: center;
      .yzm {
        margin-top: 1px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .ru {
      margin: 0 40px;
    }
  }
}
</style>