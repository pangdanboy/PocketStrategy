import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户是否登录
    currentUser: false,
    // 是否是管理员
    admin: false,
    currentScrollTop: 0,
    scrollDirection: 1
  },
  getters: {
    getScrollTop (state) {
      return state.currentScrollTop
    }
  },
  mutations: {
    changeCurrentUser (state, newValue) {
      state.currentUser = newValue
    },
    changeScrollTop (state, newValue) {
      state.currentScrollTop = newValue
    },
    changeAdmin (state, newValue) {
      state.admin = newValue
    },
    changeScrollDirection (state, newValue) {
      state.scrollDirection = newValue
    }
  },
  actions: {
  },
  modules: {
  }
})
