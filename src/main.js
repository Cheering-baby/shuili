import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router.js';
import Axios from 'axios';
import { Message, Loading } from 'element-ui'
Vue.use(Loading.directive)
Vue.config.productionTip = false
Vue.prototype.$Axios = Axios;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
