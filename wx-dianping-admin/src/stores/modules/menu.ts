import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menuItem'

export const useMenuStore = defineStore(
  'menu',
  () => {
    // 1 动态menu
    const menu = ref<MenuItem[]>()
    // 2 改变menu
    const setMenu = (item: MenuItem[]) => {
      menu.value = item
    }
    // 3 getMenu
    const getMenu = () => {
      // 加！表示肯定不为空防止报错
      const parse = JSON.parse(localStorage.getItem('menu')!)
      // 但是实际上拿到的时候可能为空 加？表示如果为空就获取store中的数据
      return parse?.menu || menu.value
    }
    // 4 removeMenu
    const removeMenu = () => {
      menu.value = []
    }
    return {
      menu,
      setMenu,
      getMenu
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
