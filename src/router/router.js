import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/daping/daping1.vue')
    },
    {
      path: '/daping',
      name: 'daping',
      component: () => import('@/views/daping/daping1.vue')
    },
    {
      path: '/zonghe',
      name: 'zonghe',
      component: () => import('@/views/zonghe/zonghe.vue')
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
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/daping/daping.vue')
    }
  ]
})
