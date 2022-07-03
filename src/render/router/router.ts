import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
})

export default router
