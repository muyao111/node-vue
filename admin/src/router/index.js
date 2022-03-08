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

      { path: '/heroes/create', component: () => import('../views/HeroEdit'), props: true },
      { path: '/heroes/edit/:id', component: () => import('../views/HeroEdit'), props: true },
      { path: '/heroes/list', component: () => import('../views/HeroList') },

      { path: '/ariticles/create', component: () => import('../views/AriticleEdit'), props: true },
      { path: '/ariticles/edit/:id', component: () => import('../views/AriticleEdit'), props: true },
      { path: '/ariticles/list', component: () => import('../views/AriticleList') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
