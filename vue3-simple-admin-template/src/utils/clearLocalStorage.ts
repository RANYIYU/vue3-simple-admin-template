import { useUserStore } from '@/stores/modules/user'
import { useMenuStore } from '@/stores/modules/menu'
import { useHeaderStore } from '@/stores'

export const clearLocalStorage = (): void => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const headStore = useHeaderStore()
  userStore.clearToken()
  menuStore.removeMenu()
  headStore.clearBreadcrumbList()
  headStore.clearTag()
  localStorage.removeItem('menu')
  localStorage.removeItem('user')
  localStorage.removeItem('activeMenu')
  localStorage.removeItem('header')
  localStorage.removeItem('defaultActiveMenu')
}
