import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import resetStyle from './assets/css/reset.css'
import iconStyle from './assets/font/iconfont.css'
import { Message, Upload, FormItem } from 'element-ui'
Vue.use(resetStyle)
Vue.use(iconStyle)
Vue.use(Upload)
Vue.use(FormItem)
Vue.prototype.$message = Message
Vue.component(Message.name, Message)
// 配置全局axios请求地址
axios.defaults.baseURL = 'http://localhost:5000/api/'
// 全局配置axios
// 请求拦截，在每次发送请求之前在请求头中添加当前用户的token
axios.interceptors.request.use(config => {
  // 如果此时用户登录
  if (localStorage.userToken) {
    // 设置统一的的请求header
    config.headers.Authorization = localStorage.userToken
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截，token值过期的时候，做统一做处理，跳转到登录，重新登录，删除token
axios.interceptors.response.use(response => {
  return response
}, error => {
  // return Promise.reject(error)
  // eslint-disable-next-line no-unreachable
  Message.error(error.response.data)
  // 获取错误状态码
  const { status } = error.response
  if (status === 401) {
    Message.error('请重新登录')
    // 清除token
    localStorage.removeItem('userToken')
    // 返回主页
    router.push('/home')
  }
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    console.log(this.$route)
  },
  methods: {
  }
}).$mount('#app')
