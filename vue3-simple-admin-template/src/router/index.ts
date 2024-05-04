import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout/LayoutComponent.vue'),
      redirect: '/report',
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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginComponent.vue')
    }
  ]
})

export default router
