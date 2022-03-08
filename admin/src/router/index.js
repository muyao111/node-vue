import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta: {
      isPublic: true, // 除了登录页其他都需要auth权限
    },
  },
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

      { path: '/ads/create', component: () => import('../views/AdEdit'), props: true },
      { path: '/ads/edit/:id', component: () => import('../views/AdEdit'), props: true },
      { path: '/ads/list', component: () => import('../views/AdList') },

      { path: '/admin_users/create', component: () => import('../views/AdminUserEdit'), props: true },
      { path: '/admin_users/edit/:id', component: () => import('../views/AdminUserEdit'), props: true },
      { path: '/admin_users/list', component: () => import('../views/AdminUserList') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 去非公开页面 且 无token
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
