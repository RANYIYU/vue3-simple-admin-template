<script setup lang="ts">
import { defineProps, markRaw } from 'vue'
import RecursiveMenuComponent from '@/components/sidebar/RecursiveMenuComponent.vue'
import { useRouter } from 'vue-router'
import type { MenuItem } from '@/types/menuItem'
import { useHeaderStore } from '@/stores/modules/header'

// 1 指定item的类型

// 泛型自变量
const props = defineProps<{
  menuList: MenuItem[]
  parentItem?: MenuItem // 用了可选链即表示parentItem可以为undefined
  topParentItem?: MenuItem // 顶层parentItem列表
  ancestors?: MenuItem[] // parentItem列表
}>()

// 2 路由跳转
const router = useRouter()
const userHeader = useHeaderStore()

// 3 点击菜单修改状态
const menuClick = (item: MenuItem) => {
  // 修改面包屑
  userHeader.setBreadcrumbList(item, props.ancestors)
  // 修改tag
  userHeader.setTagList(item)
  // 修改activeMenu
  const activeMenu = {
    title: item.title,
    path: item.path
  }
  activeMenu.title = item.title
  activeMenu.path = item.path
  localStorage.setItem('activeMenu', JSON.stringify(activeMenu))
  // 判断路由是否存在存在就跳转
  router.push(item.path)
}
</script>

<template>
  <!--这个根标签不能使用div 递归渲染会造成有很多div 导致bug如折叠问题 可以把template替换为div尝试一下-->
  <template v-for="item in props.menuList" :key="item.title">
    <!--二级菜单-->
    <el-sub-menu v-if="item.children" :index="item.title">
      <!--二级菜单标题和图标-->
      <template #title>
        <el-icon>
          <component :is="markRaw(item.icon)" />
        </el-icon>
        <!--<component class="myLogo" :is="item.icon" />-->
        <span>{{ item.title }}</span>
      </template>
      <!--二级菜单子菜单-->
      <RecursiveMenuComponent
        :menu-list="item.children"
        :parent-item="item"
        :top-parent-item="props.topParentItem || item"
        :ancestors="props.ancestors ? [...props.ancestors, item] : [item]"
      />
    </el-sub-menu>
    <!--一级菜单-->
    <el-menu-item @click="menuClick(item)" v-else :index="item.title">
      <el-icon>
        <component :is="markRaw(item.icon)" />
      </el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
.myLogo {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
// 1 初始化item的默认宽度
.el-menu-item {
  margin: 5px 5px 0 5px;
}
// 2 点击后的item背景色
.el-menu-item.is-active {
  background: #4235b7 !important;
  border-radius: 10px;
  margin-left: 5px;
}

// 2 hover item背景色
.el-menu-item:hover {
  background: #263270;
  border-radius: 10px;
}

// sub menu 必须使用深度 选择器不然权重可能不够
:deep(.el-sub-menu__title) {
  margin-left: 5px;
}
:deep(.el-sub-menu__title):hover {
  background: #263270;
  border-radius: 10px;
  margin-left: 5px;
}
</style>
