<template>
  <div class="block">
    <div class="content">
      <img :src="currentImg" width="70%" height="90%" id="images">
      <!-- <img :src="currentImg"  id="images"> -->
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
</template>

<script>
import Vue from "vue";
import viewer from "viewerjs";
import { Slider } from "element-ui";
import "viewerjs/dist/viewer.min.css";
Vue.use(Slider);
let myViewer;
export default {
  props: {
    title: {
      type: String,
      default: "卫星云图"
    },
    url: {
      type: String,
      default: "http://imgapi.istrongcloud.com:8025/images/radar/single/fj_fuzhou/3"
    },
    speed: {
      type: Number,
      default: 1000
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
      step: 0,
      isActive: false
    };
  },

  components: {},
  watch: {
    url: function() {
      this.getDate()
      console.log('change url')
    }
  },
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
      this.loading = this.$loading({background:'rgba(0, 0, 0, 0.8)'});
      this.$Axios.get(this.url).then(res => {
        console.log(res.data);
        this.ImageData = res.data;
        this.currentImg = this.ImageData[0].url;
        this.len = this.ImageData.length;
        this.step = Math.ceil(100 / this.len);
        this.currentImg = this.ImageData[this.currentIndex].url;
        this.time = this.ImageData[this.currentIndex].producttime;
        this.loading.close();
        //   this.move()
        myViewer = new viewer(document.getElementById("images"), {
          toolbar: {
            zoomIn: 4,
            zoomOut: 4,
            oneToOne: 4,
            reset: 4,
            prev: 4,
            play: {
              show: 4,
              size: "large"
            },
            next: 4,
            rotateLeft: 4,
            rotateRight: 4,
            flipHorizontal: 4,
            flipVertical: 4
          }
        });
      });
    },
    changeImage(val) {
      this.isActive = false;
      //   console.log(this.value1);
      clearInterval(this.timer);
      this.currentIndex = Math.round(this.value1 / this.step);
      this.currentImg = this.ImageData[this.currentIndex].url;
      this.time = this.ImageData[this.currentIndex].producttime;
    },
    move() {
      //   let step = Math.ceil(100/this.len)
      //   console.log(step)
      this.timer = setInterval(() => {
        this.value1 += this.step;
        this.currentImg = this.ImageData[this.currentIndex].url;
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
      }, this.speed);
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
      this.currentImg = this.ImageData[this.currentIndex].url;
      this.time = this.ImageData[this.currentIndex].producttime;
      this.value1 = 100 * this.currentIndex/(this.len - 1)
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
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .content {
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
    .control {
      width: 70%;
      margin: 0 auto;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .button {
        cursor: pointer;
        display: flex;
        padding-right: 10px;
        .pause,
        .pre,
        .nex,
        .bofang {
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
      }
    }
}

</style>