import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
import './directive'

import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.baseURL = '/admin'

const whiteList = ['/login']
axios.interceptors.request.use(
  (config) => {
    console.log(config)

    if (whiteList.includes(config.url)) {
      console.log('登录url,不做处理')
    } else {
      if (sessionStorage.getItem('token')) {
        config.headers['Authorization'] = sessionStorage.getItem('token')
      } else {
        this.$router.replace('/login').then()
        location.reload()
      }
    }

    return config
  },
  (err) => {
    // 出错调用
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          sessionStorage.removeItem('token')
          this.$router.replace('/login').then()
          location.reload()
          break
        case 403:
          Message.error('权限不足')
          break
      }
    }
	let data = {
		message:'系统异常'
	}
	if(error&&error.response&&error.response.data){
		data = error.response.data;
	}
    return Promise.reject(data) // 返回接口返回的错误信息
  }
)

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter(routerConfig)
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    // 如果是访问的白名单中的页面
    return next() // 不需要校验，直接返回继续访问该页面
  }
  const isTokenAvailable = sessionStorage.getItem('token') // 校验token是否失效
  if (isTokenAvailable) {
    if (to.path === '/login') {
      // 如果访问的是login页面，则回到首页
      next('/')
    } else {
      // 如果访问的不是login页面，则继续访问当前要访问的页面
      next()
    }
  } else {
    // 如果token
    next('/login') //  跳转到登录页面
  }
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
