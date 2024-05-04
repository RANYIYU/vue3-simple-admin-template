import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/LoginComponent.vue'
import layout from '@/views/layout/LayoutComponent.vue'

// 登录之后根据各自权限跳转到各自的第一个页面
const defaultActiveMenu = JSON.parse(localStorage.getItem('defaultActiveMenu') || '{}')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: defaultActiveMenu?.path || '/login',
      children: [
        // {
        //   path: '/home',
        //   name: 'home',
        //   component: () => import('@/views/home/HomeComponent.vue')
        // },
        // {
        //   path: '/report',
        //   name: 'report',
        //   component: () => import('@/views/report/ReportComponent.vue')
        // }
      ]
    }
  ]
})

export default router
