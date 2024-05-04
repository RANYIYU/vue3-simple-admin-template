import router from '@/router'
import { useUserStore } from '@/stores/modules/user'

export const authGuard = () => {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    if (!userStore.getToken() && to.path !== '/login') return '/login'
    // 登录了不能跳转到登录页
    if (userStore.getToken() && to.path === '/login') return false
  })
}
