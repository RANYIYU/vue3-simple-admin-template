import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 统一处理所有仓库数据
// import { useUserStore } from '@/stores/mudules/user'
// export { useUserStore }

// 简写
export * from '@/stores/modules/header'
