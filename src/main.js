import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router.js';
import Axios from 'axios';
import ElementUI from 'element-ui'
import { Message, Loading } from 'element-ui'
import store from './store/store'
import 'babel-polyfill'
Vue.use(Loading.directive)
Vue.config.productionTip = false
Vue.prototype.$Axios = Axios;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
