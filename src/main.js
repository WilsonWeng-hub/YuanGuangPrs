// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import store from './store'
import permission from './permission'
import './axios'
import mavonEitor from 'mavon-editor'

import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEitor)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})