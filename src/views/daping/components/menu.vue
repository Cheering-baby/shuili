<!--  -->
<template>
  <div class="menu">
     <div class="content" v-for="item in menuItem" :key="item.id" :class="{active:item.id == currentId}" @click="changeMenu(item)">
         <div class="title iconfont" :class="[item.icon]"></div>
         <div>{{item.title}}</div>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        menuItem:[
            {id:1,title:'天气预报',component:'tianqi',icon:'icon-tubiaozhizuomobanyihuifu-'},
            {id:2,title:'台风专题',component:'typhoon',icon:'icon-taifeng'},
            {id:3,title:'卫星云图',component:'weixin',icon:'icon-weixing'},
            {id:4,title:'雷达云图',component:'leida',icon:'icon-iconset0398'},
            {id:5,title:'风场图',component:'fc',icon:'icon-fengsu'},
        ],
        currentId: 1
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
      changeMenu(item) {
        this.currentId = item.id
        this.$emit('showComponent',item.component)
      }
  }
}

</script>
<style lang='scss' scoped>
.menu{
    height:100%;
    border-right:1px solid rgb(230, 230, 230);
    .content{
        width:150px;
        height:50px;
        display:flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        .title{
            margin-right:20px;
            margin-left:10px;
        }
    }
    .content:hover{
        background:rgb(236, 245, 255);
    }
    .active{
        background:rgb(236, 245, 255);
        color:rgb(31, 144, 242);
    }
}
</style>