import Vue from 'vue'
import App from './App.vue'
// router
import router from './router'
// vuex
import store from './store'
// axios
import http from './api/http'
// element-ui
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
