import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home'
import Atlas from './../views/Atlas'
import Album from './../views/Album'
import Talk from './../views/Talk'
import About from './../views/About'
import Message from './../views/Message'
import UserCenter from './../views/UserCenter'
import Refresh from './../views/Refresh'
import EditStrategy from '../views/EditStrategy'
import Strategy from '../views/Strategy'

Vue.use(VueRouter)
// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/atlas', component: Atlas },
  { path: '/album', component: Album },
  { path: '/talk', component: Talk },
  { path: '/about', component: About },
  { path: '/message', component: Message },
  { path: '/user', component: UserCenter },
  { path: '/Refresh', component: Refresh },
  { path: '/EditStrategy', component: EditStrategy },
  { path: '/Strategy', component: Strategy }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
