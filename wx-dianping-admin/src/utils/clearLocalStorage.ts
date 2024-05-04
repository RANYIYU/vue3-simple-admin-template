import { useUserStore } from '@/stores/modules/user'

export const clearLocalStorage = (): void => {
  const userStore = useUserStore()
  userStore.clearToken()
  localStorage.removeItem('menu')
  localStorage.removeItem('user')
  localStorage.removeItem('activeMenu')
  localStorage.removeItem('header')
  localStorage.removeItem('defaultActiveMenu')
}
