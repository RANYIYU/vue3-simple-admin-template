// import './assets/main.css'
import './assets/base.css'

// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
// 方法1
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 方法2
import pinia from '@/stores/index'
import { authGuard } from '@/utils/authGuard'
import { getSingleLevelResult } from '@/utils/extractLeafAndSingleLevelItems'
import { useMenuStore } from '@/stores/modules/menu'
// 自动导入elementUI
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册的同时注册持久化插件
app.use(pinia)
// 给现有一级layout路由添加子路由（在main中的好处就是刷新之后动态路由依然存在）
// 同时用到了仓库的数据所以需要在仓库初始化之后
// 确保在 app.use(router) 之前调用因为路由注册前需要填充好
const menuStore = useMenuStore()
getSingleLevelResult(menuStore.getMenu(), router)

app.use(router)

// 登录路由拦截
authGuard()

app.mount('#app')
