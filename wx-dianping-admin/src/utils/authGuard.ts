import router from '@/router'
import { useUserStore } from '@/stores/modules/user'

export const authGuard = () => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (!userStore.getToken()) {
      // 如果没有token，且当前页面不是登录页，才重定向到登录页
      if (to.path !== '/login') {
        next({ path: '/login' })
      } else {
        // 如果已经是登录页，则直接next()，避免无限重定向
        next()
      }
    } else {
      // 如果有token，直接允许导航继续（但是不能退回到登录页）
      if (to.path === '/login') {
        next({ path: '/home' })
      } else {
        next()
      }
    }
  })
}
