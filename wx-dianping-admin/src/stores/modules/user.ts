import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1 token
    const token = ref<string>('')
    const getToken = () => {
      const user = JSON.parse(localStorage.getItem('user')!)
      return user?.token || token.value
    }
    const setToken = (newToken: string) => {
      token.value = newToken
    }

    // 清空了缓存但是仓库里面的token还在也需要清除 因为store数据只有刷新的时候才会清除
    const clearToken = () => {
      token.value = ''
    }

    return {
      token,
      getToken,
      setToken,
      clearToken
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
