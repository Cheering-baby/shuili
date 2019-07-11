<!--  -->
<template>
  <div class="nav">
    <div class="laiyuan">
      <span>来源：</span>
      <el-select v-model="laiyuan" placeholder="请选择" size="small">
        <el-option v-for="item in source" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="laiyuan" v-if="laiyuan === 'single' || laiyuan === '单站雷达图'">
      <span>类型：</span>
      <el-select v-model="type" placeholder="请选择" size="small">
        <el-option
          v-for="item in typeRange"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="laiyuan" v-else>
      <span>类型：</span>
      <el-select v-model="type" placeholder="请选择" size="small">
        <el-option
          v-for="item in typeRange2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="laiyuan">
      <span>时间：</span>
      <el-select v-model="time" placeholder="请选择" size="small">
        <el-option
          v-for="item in timeRange"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="laiyuan">
      <span>速度：</span>
      <el-select v-model="speed" placeholder="请选择" size="small">
        <el-option
          v-for="item in speedRange"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- <el-button type="warning" size="small" style="font-size:16px;" @click="changeCondition()">{{conditionText}}</el-button> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Select, Option, Button } from "element-ui";
Vue.use(Select);
Vue.use(Button);
Vue.use(Option);
export default {
  data() {
    return {
      source: [
        {
          value: "single",
          label: "单站雷达图"
        },
        {
          value: "mingle",
          label: "拼图"
        }
      ],
      timeRange: [
        {
          value: 1,
          label: "1小时"
        },
        {
          value: 3,
          label: "3小时"
        },
        {
          value: 6,
          label: "6小时"
        }
      ],
      typeRange: [
        {
          value: 'fj_fuzhou',
          label: "福建福州"
        },
        {
          value: 'fj_xiamen',
          label: "福建厦门"
        },
        {
          value: 'fj_quanzhou',
          label: "福建泉州"
        },
        {
          value: 'fj_jianyang',
          label: "福建建阳"
        },
        {
          value: 'fj_longyan',
          label: "福建龙岩"
        },
        {
          value: 'fj_sanming',
          label: "福建三明"
        },
        {
          value: 'fj_ningde',
          label: "福建宁德"
        }
      ],
      typeRange2: [
        {
          value: 'huanan',
          label: "华南雷达拼图"
        },
        {
          value: 'huadong',
          label: "华东雷达拼图"
        },
        {
          value: 'xinan',
          label: "西南雷达拼图"
        },
        {
          value: 'huazhong',
          label: "华中雷达拼图"
        },
        {
          value: 'quanguo',
          label: "全国雷达拼图"
        },
        {
          value: 'fjqx',
          label: "福建雷达拼图"
        },
        {
          value: 'zhejiang',
          label: "浙江雷达拼图"
        }
      ],
      speedRange: [
        {
          value: 500,
          label: "0.5秒"
        },
        {
          value: 1000,
          label: "1秒"
        },
        {
          value: 1500,
          label: "1.5秒"
        },
        {
          value: 2000,
          label: "2秒"
        }
      ],
      laiyuan: "单站雷达图",
      speed: "1秒",
      time: "3小时",
      type: "福建福州",
      conditionText: "播放"
    };
  },

  components: {},

  computed: {},
  watch: {
    laiyuan: function(val) {
      if(val === 'mingle') this.type = '华南雷达云图'
      if(val === 'single') this.type = '福建福州'
      this.$emit("changeCondition", this.laiyuan,this.type, this.time, this.speed);
    },
    time: function(val) {
      this.$emit("changeCondition", this.laiyuan,this.type, this.time, this.speed);
    },
    speed: function(val) {
      this.$emit("changeCondition", this.laiyuan,this.type, this.time, this.speed);
    },
    type: function(val) {
      this.$emit("changeCondition", this.laiyuan,this.type, this.time, this.speed);
    }
  },
  // mounted(){},

  methods: {
    changeCondition() {
      this.conditionText === "播放"
        ? (this.conditionText = "暂停")
        : (this.conditionText = "播放");
    }
    // filter() {
    //   if(this.laiyuan === '风云二号'){

    //   }
    // }
  }
};
</script>
<style>
.el-input__inner {
  width: 140px;
}
</style>

<style lang='scss' scoped>
.nav {
  padding: 0 10px;
  display: flex;
  height: 50px;
  background: rgb(86, 152, 213);
  align-items: center;
  .laiyuan {
    display: flex;
    align-items: center;
    margin-right: 50px;
  }
  span {
    color: #fff;
  }
}
</style>