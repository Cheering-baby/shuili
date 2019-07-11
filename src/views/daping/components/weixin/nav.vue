<!--  -->
<template>
  <div class="nav">
    <div class="laiyuan">
      <span>来源：</span>
      <el-select v-model="laiyuan" placeholder="请选择" size="small">
        <el-option v-for="item in source" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="laiyuan">
      <span>时间：</span>
      <el-select v-model="time" placeholder="请选择" size="small">
        <el-option v-for="item in timeRange" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="laiyuan">
      <span>速度：</span>
      <el-select v-model="speed" placeholder="请选择" size="small">
        <el-option v-for="item in speedRange" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
          value: 2,
          label: "风云二号"
        },
        {
          value: 4,
          label: "风云四号A星"
        }
      ],
      timeRange: [
        {
          value: 12,
          label: "12小时"
        },
        {
          value: 24,
          label: "24小时"
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
      laiyuan: "风云二号",
      speed: '1秒',
      time: '12小时',
      conditionText: "播放"
    };
  },

  components: {},

  computed: {},
  watch:{
     laiyuan: function(val){
       this.$emit('changeCondition',this.laiyuan,this.time,this.speed)
     },
     time: function(val){
       this.$emit('changeCondition',this.laiyuan,this.time,this.speed)
     },
     speed: function(val){
       this.$emit('changeCondition',this.laiyuan,this.time,this.speed)
     }
  },
  // mounted(){},

  methods: {
      changeCondition() {
          this.conditionText === '播放' ? this.conditionText = '暂停':this.conditionText = '播放'
      },
      // filter() {
      //   if(this.laiyuan === '风云二号'){

      //   }
      // }
  }
};
</script>
<style>
.el-input__inner{
    width:130px;
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