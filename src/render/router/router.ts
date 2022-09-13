import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/home/Home.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login/Login.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
})

export default router
