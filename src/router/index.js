import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home'
import Atlas from './../views/Atlas'
import Album from './../views/Album'
import News from '../views/News'
import About from './../views/About'
import Message from './../views/Message'
import UserCenter from './../views/UserCenter'
import RefreshUser from '../views/RefreshUser'
import EditStrategy from '../views/EditStrategy'
import Strategy from '../views/Strategy'
import MyArticle from '../views/MyArticle'
import NewsContent from '../views/NewsContent'

Vue.use(VueRouter)
// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/all', component: Atlas },
  { path: '/album', component: Album },
  { path: '/news', component: News },
  { path: '/about', component: About },
  { path: '/message', component: Message },
  { path: '/user', component: UserCenter },
  { path: '/RefreshUser', component: RefreshUser },
  { path: '/EditStrategy', component: EditStrategy },
  { path: '/Strategy', component: Strategy },
  { path: '/MyArticle', component: MyArticle },
  { path: '/NewsContent', component: NewsContent }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
