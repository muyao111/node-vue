import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      { path: '/categories/create', component: () => import('../views/CategoryEdit'), props: true },
      { path: '/categories/edit/:id', component: () => import('../views/CategoryEdit'), props: true },
      { path: '/categories/list', component: () => import('../views/CategoryList') },

      { path: '/items/create', component: () => import('../views/ItemEdit'), props: true },
      { path: '/items/edit/:id', component: () => import('../views/ItemEdit'), props: true },
      { path: '/items/list', component: () => import('../views/ItemList') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
