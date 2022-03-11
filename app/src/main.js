import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import http from './api/http'
Vue.prototype.$http = http

import Card from './components/Card.vue'
Vue.component('my-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('my-list-card', ListCard)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
