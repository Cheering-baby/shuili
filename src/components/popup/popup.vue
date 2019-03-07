!<template>
  <div class="popup" :style="{width: width + 'px'}">
      <div>
        <div class="top">
          <div class="title">{{title}}</div>
          <div class="fangda" @click="change('fangda')"></div>
        </div>
        <div class="content">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in img" :key="item.text" >
                <div class="text">{{item.text}}</div>
                <img :src="item.imgUrl">
                </el-carousel-item>
            </el-carousel>       
        </div>
      </div>
     <transition name="fade">
        <div class="content_big" v-if="showBig">
            <div class="title_big">
                <div class="title">{{title}}</div>
                <div class="suoxiao" @click="change('suoxiao')"></div>                
            </div>
            <el-carousel :interval="5000" arrow="always" style="height:100%;">
                <el-carousel-item v-for="item in img" :key="item.imgUrl">
                <div class="text">{{item.text}}</div>
                <img :src="item.imgUrl" class="img_big">
                </el-carousel-item>
            </el-carousel>       
        </div>
     </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel, CarouselItem } from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)
export default {
  name: 'popup',
  props:{
     title:{
        type: String,
        default: '卫星云图'
     },
     width:{
        type: Number,
        default: 400
     },
     imgHeight:{
        type: Number,
        defalut: 300
     },
     imgWidth:{
        type: Number,
        defalut: 300         
     },
     img:{
        type: Array,
        default: () => {
            return [
                {text:'2019年03月02日 10时00分', imgUrl:'http://wdy.fzqx.gov.cn:2001/Files/WEATHER/SAT/PRODUCT/FY2D_GPF_M_IR1_P1/2019/03/02/FY2G_M_IR1_P1_201903021000000.JPG'},
                {text:'2019年03月02日 11时00分', imgUrl:'http://wdy.fzqx.gov.cn:2001/Files/WEATHER/SAT/PRODUCT/FY2D_GPF_M_IR1_P1/2019/03/02/FY2G_M_IR1_P1_201903021100000.JPG'},
                {text:'2019年03月02日 12时00分', imgUrl:'http://wdy.fzqx.gov.cn:2001/Files/WEATHER/SAT/PRODUCT/FY2D_GPF_M_IR1_P1/2019/03/02/FY2G_M_IR1_P1_201903021200000.JPG'}
            ]
        }
     }
  },
  data () {
    return {
      showBig: false
    }
  },

  components: {},

  mounted() {},

  methods: {
      change (type) {
          if(type === 'fangda'){
            this.showBig = true
          }
          if(type === 'suoxiao'){
            this.showBig = false
          }          
      }
  }

}

</script>
<style>
  .content_big .el-carousel__container{
      height:100%;
  }
  .el-carousel__item img {
    height:100%;
  }
  
  .el-carousel__item {
    background-color: #99a9bf;
  }
  
  /* .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  
  .el-carousel__arrow{
      background:rgba(66,66,66,.7);
  }
</style>
<style lang='scss' scoped>
.popup{
    .top{
        height:30px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        border-left:solid 8px rgb(31, 156, 255);
        padding-left:10px;
        margin-bottom:5px;
        .title{
            font-size:16px;
        }
        .fangda{
            width:32px;
            height:30px;
            background:url(/public/img/fangda.png) top 8px left 0px no-repeat;
            background-size:60% 60%;
            cursor:pointer;
        }
    }
    .content{
        width:100%;
        .text{
            width:100%;
            text-align:center;
            height:25px;
            line-height:25px;
            font-size:16px;
        }
    }
    .content_big{
        position:fixed;
        height:100%;
        width:100%;
        top:60px;
        left:0;
        z-index:2019;
        background-color:#99a9bf;
        color:#fff;
        .title_big{
            display:flex;
            justify-content: space-between;
            align-items:center;
            border-left:solid 8px rgb(31, 156, 255);
            padding-left: 10px; 
            .title{
                font-size:20px;
            }
            .suoxiao{
                width:32px;
                height:30px;
                background:url(/public/img/suoxiao.png) top 8px left 0px no-repeat;
                background-size:60% 60%;
                cursor:pointer;
            }
        }
        .img_big{
            margin-left:50%;
            transform: translateX(-50%);
            height:80%;
        }
        .text{
            width:100%;
            height:30px;
            line-height:30px;
            font-size:20px;
            text-align:center;
        }
    }   
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>