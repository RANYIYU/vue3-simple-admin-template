<script setup lang="ts">
import SideBarComponent from '@/components/sidebar/SideBarComponent.vue'
import { computed, ref } from 'vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import { useMenuStore } from '@/stores/modules/menu'
// todo 假设请求来了菜单数据 动态渲染menu
const menuStore = useMenuStore()
const getMenuData = computed(() => {
  // console.log(menuStore.getMenu())
  return menuStore.getMenu()
})
</script>

<template>
  <el-container>
    <!--sidebar-->
    <el-aside width="auto">
      <SideBarComponent :menuList="getMenuData" />
    </el-aside>
    <el-container>
      <!--header-->
      <el-header>
        <header-component />
      </el-header>
      <!--content-->
      <el-main class="content">
        <!--二级路由-->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
// 去除header的空隙
.el-header {
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.content {
  background: #f0f0f0;
  margin-top: 36px;
}
</style>
