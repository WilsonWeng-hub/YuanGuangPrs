import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations:{
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token)
    },
    SET_USERINFO: (state, userInfo) => {
      console.log('SET_USERINFO')
      console.log(userInfo)
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    },

  },
  actions:{},
  modules:{},
  getters:{
    getUsers: state => {
      return state.userInfo
    }
  }
})