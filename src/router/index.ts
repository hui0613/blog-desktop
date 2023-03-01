import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@render/views/Home.vue'
import Editor from '@render/views/EditorContainer.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
