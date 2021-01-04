import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
 
import axios from 'axios';
axios.defaults.baseURL = "/admin";

Vue.prototype.$http = axios
   
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter(routerConfig)
 
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
