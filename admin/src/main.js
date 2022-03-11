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
// 全局css
import './style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

// 访问不发http请求的接口，即访问新建页面时，允许携带token解决上传图片需要权限问题
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      }
    },
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
