import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Producto from '../pages/producto/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/producto/',
    name: 'Producto',
    component: Producto,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/vue_aws/'), // tu base URL en GitHub Pages
  routes
})

export default router
