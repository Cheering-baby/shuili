<template>
  <div class="block">
    <div class="top">
      <div class="title">{{title}}</div>
      <div class="fangda" @click="change('fangda')"></div>
    </div>
    <div class="time">{{time | format}}</div>
    <img :src="currentImg" alt>
    <div class="control">
      <div class="button">
        <div class="pre" @click="step(-1)"></div>
        <div :class="[isActive ? 'bofang' : 'pause']" @click="changeCondition()"></div>
        <div class="nex" @click="step(1)"></div>
      </div>
      <div class="move">
        <el-slider v-model="value1" :show-tooltip="false" @change="changeImage()"></el-slider>
      </div>
    </div>
    <div class="quping"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Slider } from "element-ui";
Vue.use(Slider);
export default {
  props: {
   title: {
       type: String,
       default: '卫星云图'
   },
   url: {
     type: String,
     default: "http://192.168.118.226:9831/webapi/api/v1/weather/cloud?time=%5B2019%2F03%2F24%2010%3A20%3A04%2C2019%2F03%2F25%2010%3A20%3A04%5D&sort=asc&type=FY2D_GPF_M_IR1_P1"
   }
  },
  data() {
    return {
      value1: 0, //滚轴百分比
      ImageData: [], //图片数据
      currentImg: "", //当前展示图片url
      timer: null, //定时器
      len: 0, //图片数组长度,
      currentIndex: 0,
      time: "2019年3月18日", //标题时间,
      step: 0,
      isActive: false
    };
  },

  components: {},

  mounted() {
    this.getDate();
  },
  filters: {
    format: function(val) {
      console.log(val);
      return val;
    }
  },
  methods: {
    getDate() {
      this.$Axios
        .get(
          this.url
        )
        .then(res => {
          console.log(res.data.data);
          this.ImageData = res.data.data;
          this.currentImg = this.ImageData[0].filepath;
          this.len = this.ImageData.length;
          this.step = Math.ceil(100 / this.len);
          this.currentImg = this.ImageData[this.currentIndex].filepath;
          this.time = this.ImageData[this.currentIndex].producttime;
          //   this.move()
        });
    },
    changeImage(val) {
      this.isActive = false;
      //   console.log(this.value1);
      clearInterval(this.timer);
      this.currentIndex = Math.round(this.value1 / this.step);
      this.currentImg = this.ImageData[this.currentIndex].filepath;
      this.time = this.ImageData[this.currentIndex].producttime;
    },
    move() {
      //   let step = Math.ceil(100/this.len)
      //   console.log(step)
      this.timer = setInterval(() => {
        this.value1 += this.step;
        this.currentImg = this.ImageData[this.currentIndex].filepath;
        this.time = this.ImageData[this.currentIndex].producttime;
        this.currentIndex += 1;
        if (this.value1 >= 100) {
          this.value1 = 100;
          // this.currentIndex = this.len
          window.clearInterval(this.timer);
          this.isActive = false;
          console.log("jishu");
        }

        // console.log(123)
      }, 1000);
    },
    changeCondition() {
      this.isActive = !this.isActive;
      if (this.isActive === true) {
        clearInterval(this.timer);
        if (this.value1 === 100) {
          this.value1 = 0;
          this.currentIndex = 0;
        }
        this.move();
      } else {
        clearInterval(this.timer);
      }
    }
    // step(type) {
    //    if(type === -1) {
    //        this.currentIndex +=-1
    //        if(this.currentIndex < 0){
    //            this.currentIndex = 0
    //        }
    //    }else{
    //        this.currentIndex +=1
    //        if(this.currentIndex > 0){
    //            this.currentIndex = 0
    //        }
    //    }
    // }
  }
};
</script>
<style lang='scss' scoped>
.block {
  width: 400px;
  // margin-left: 10px;
  // margin-top: 20px;
  margin-bottom:5px;
  position: relative;
  img {
    width: 100%;
  }
  .top {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: solid 8px rgb(31, 156, 255);
    padding-left: 10px;
    margin-bottom: 5px;
    .title {
      font-size: 16px;
    }
    .fangda {
      width: 32px;
      height: 30px;
      background: url(/public/img/fangda.png) top 8px left 0px no-repeat;
      background-size: 60% 60%;
      cursor: pointer;
    }
  }
  .time {
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
  .control {
    //   width:100%;
    padding-right: 5px;
    display: flex;
    align-items: center;
    //   .pause{
    //       background:url(/public/img/bf.png);
    //   }
    .button {
      cursor: pointer;
      flex-grow: 1;
      display: flex;
      // align-items:center;
      padding-right: 10px;
      .pause,
      .pre,
      .nex,
      .bofang {
        //   flex-grow:1;
        width: 33px;
        height: 33px;
      }
      .pause {
        background: url(/public/img/zt.png) no-repeat center;
        background-size: 120% 120%;
      }
      .bofang {
        background: url(/public/img/bf.png) no-repeat center;
        background-size: 90% 90%;
      }
      .pre,
      .nex {
        background: url(/public/img/step.png) no-repeat center;
        background-size: 70% 70%;
      }
      .pre {
        transform: rotate(180deg);
        margin-top: 2px;
      }
    }
    .move {
      width: 250px;
      // margin-top:-2px;
    }
  }
  .quping{
    position:fixed;
  }
}
</style>