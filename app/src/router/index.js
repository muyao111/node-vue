import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('../views/Home.vue') },
      { path: '/strategycenter', name: 'strategycenter', component: () => import('../views/Home.vue') },
      { path: '/matchcenter', name: 'matchcenter', component: () => import('../views/Home.vue') },
      { path: '/ariticles/:id', name: 'ariticle', component: () => import('../views/Ariticle.vue'), props: true },
    ],
  },
  { path: '/heroes/:id', name: 'hero', component: () => import('../views/Hero.vue'), props: true },
]

const router = new VueRouter({
  routes,
})

export default router
