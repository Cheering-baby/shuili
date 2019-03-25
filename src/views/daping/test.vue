<template>
  <div class="block">
    <div class="top">
      <div class="title">{{title}}</div>
      <div class="fangda" @click="change('fangda')"></div>
    </div>
    <div class="time">{{time | format}}</div>
    <img :src="currentImg" height="255">
    <div class="control">
      <div class="button">
        <div class="pre" @click="stepForward(-1)"></div>
        <div :class="[isActive ? 'bofang' : 'pause']" @click="changeCondition()"></div>
        <div class="nex" @click="stepForward(1)"></div>
      </div>
      <div class="move">
        <el-slider v-model="value1" :show-tooltip="false" @change="changeImage()"></el-slider>
      </div>
    </div>
    <transition name="fade" v-if="showBig">
      <div class="quanping">
        <div class="title_big">
          <div class="title">{{title}}</div>
          <div class="suoxiao" @click="change('suoxiao')"></div>
        </div>
        <div class="content">
          <div class="time">{{time | format}}</div>
          <img :src="currentImg" width="80%">
        </div>
        <div class="control">
          <div class="button">
            <div class="pre" @click="stepForward(-1)"></div>
            <div :class="[isActive ? 'bofang' : 'pause']" @click="changeCondition()"></div>
            <div class="nex" @click="stepForward(1)"></div>
          </div>
          <div class="move">
            <el-slider v-model="value1" :show-tooltip="false" @change="changeImage()"></el-slider>
          </div>
        </div>
      </div>
    </transition>
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
      default: "卫星云图"
    },
    url: {
      type: String,
      default:
        "http://192.168.118.226:9831/webapi/api/v1/weather/cloud?time=%5B2019%2F03%2F24%2010%3A20%3A04%2C2019%2F03%2F25%2010%3A20%3A04%5D&sort=asc&type=FY2D_GPF_M_IR1_P1"
    },
    imageHeight: {
      type: Number,
      defalut: 100
    }
  },
  data() {
    return {
      winH: document.documentElement.clientHeight || document.body.clientHeight,
      value1: 0, //滚轴百分比
      ImageData: [], //图片数据
      currentImg: "", //当前展示图片url
      timer: null, //定时器
      len: 0, //图片数组长度,
      currentIndex: 0,
      time: "2019年3月18日", //标题时间,
      step: 0,
      isActive: false,
      showBig: false
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
      this.$Axios.get(this.url).then(res => {
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
      }, 800);
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
    },
    stepForward(type) {
      if (type === -1) {
        this.currentIndex += -1;
        console.log(-1);
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        }
      } else {
        console.log(1);
        this.currentIndex += 1;
        if (this.currentIndex > this.len - 1) {
          this.currentIndex = this.len;
        }
      }
      this.currentImg = this.ImageData[this.currentIndex].filepath;
      this.time = this.ImageData[this.currentIndex].producttime;
    },
    change(type) {
      if (type === "fangda") {
        this.showBig = true;
      }
      if (type === "suoxiao") {
        this.showBig = false;
      }
      console.log("done");
    }
  }
};
</script>
<style lang='scss' scoped>
.block {
  width: 400px;
  // margin-left: 10px;
  // margin-top: 20px;
  margin-bottom: 5px;
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
    // align-items: center;
    //   .pause{
    //       background:url(/public/img/bf.png);
    //   }
    .button {
      cursor: pointer;
      // flex-grow: 1;
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
      width: 270px;
      // margin-top:-2px;s
    }
  }
  .quanping {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2019;
    color: #fff;
    .title_big {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: solid 8px rgb(31, 156, 255);
      padding-left: 10px;
      .title {
        font-size: 20px;
      }
      .suoxiao {
        width: 32px;
        height: 30px;
        background: url(/public/img/suoxiao.png) top 8px left 0px no-repeat;
        background-size: 60% 60%;
        cursor: pointer;
      }
    }
    .content {
      position: relative;
      width: 70%;
      margin: 0 auto;
      height: 80%;
      margin-top: 20px;
      img {
        height: 100%;
      }
      .time {
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 18px;
      }
    }
    .control {
      width: 70%;
      margin: 0 auto;
      height:80px;
      display:flex;
      justify-content: center;
      align-items:center;
      margin-top:20px;
      .button {
        cursor: pointer;
        // flex-grow: 1;
        display: flex;
        // align-items:center;
        padding-right: 10px;
        .pause,
        .pre,
        .nex,
        .bofang {
          //   flex-grow:1;
          width: 60px;
          height: 60px;
        }
        .pause {
          background: url(/public/img/b_zt.png) no-repeat center;
          // background-size: 120% 120%;
        }
        .bofang {
          background: url(/public/img/b_bf.png) no-repeat center;
          // background-size: 90% 90%;
        }
        .pre,
        .nex {
          background: url(/public/img/b_step.png) no-repeat center;
          background-size: 50% 50%;
        }
        .pre {
          transform: rotate(180deg);
          margin-top: 2px;
        }
      }
      .move {
        width: 500px;
        // margin-top:-2px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>