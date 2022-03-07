import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      { path: '/categories/edit', component: () => import('../views/CategoryEdit') },
      { path: '/categories/list', component: () => import('../views/CategoryList') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
