import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import store from './store'
import router from './router'
axios.defaults.baseURL = "http://localhost:8888"
// 前置拦截器
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  let res = response.data;
  // console.log(res)
  if (res.code == 200 ){
    return response;
  }
  Element.Message.error("账号密码错误")
  return Promise.reject(response.data.msg)
},
  error => {
    console.log(console.log(error))
    if(error.response.data){
      error.Message = error.response.data.msg;
    }
    if(error.response.status === 401){
        store.commit("REMOVE_INFO")
        router.push("/login")
    }
      Element.Message.error(error.Message)
      return Promise.reject(error)
  })