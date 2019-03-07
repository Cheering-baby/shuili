import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/daping.vue')
    },
    {
      path: '/jizhi',
      name: 'jizhi',
      component: () => import('@/views/jizhi.vue')
    },
    {
      path: '/tide',
      name: 'tide',
      component: () => import('@/views/tide.vue')
    },
    {
      path: '/yuliang',
      name: 'yuliang',
      component: () => import('@/views/yuliang.vue')
    },
    {
      path: '/zonghe',
      name: 'zonghe',
      component: () => import('@/views/zonghe/zonghe.vue')
    },
    {
      path: '/ditu',
      name: 'ditu',
      component: () => import('@/components/ditu/ditu.vue')
    },
    {
      path: '/subLine',
      name: 'subLine',
      component: () => import('@/components/sub/subLine.vue')
    },
    {
      path: '/weihu',
      name: 'weihu',
      component: () => import('@/views/weihu/weihu.vue')
    },
    {
      path: '/dengru',
      name: 'dengru',
      component: () => import('@/views/dengru/dengru.vue')
    }
  ]
})
