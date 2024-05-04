<script setup lang="ts">
import { defineProps, computed } from 'vue'
import RecursiveMenuComponent from '@/components/sidebar/RecursiveMenuComponent.vue'
import { useHeaderStore } from '@/stores/modules/header'
// 1 泛型自变量
const props = defineProps<{
  menuList: MenuItem[]
}>()
// 指定item的类型
interface MenuItem {
  title: string
  icon: string
  path: string
  children: MenuItem[]
}
// // noChild
// const noChild = computed(() => {
//   return props.menuList.filter((item) => item.children?.length === 0)
// })
//
// // child
// const child = computed(() => {
//   return props.menuList.filter((item) => item.children?.length !== 0)
// })
// 2 动态判断是否折叠侧边栏
const headerStore = useHeaderStore()
const isCollapse = computed(() => {
  return headerStore.isCollapse
})

// 3 监听title事件
const title = computed(() => {
  const item = localStorage.getItem('activeMenu')
  if (item) {
    // 当前点击menu
    const parse = JSON.parse(item)
    return parse.title
  } else {
    // 默认menu
    const parse1 = JSON.parse(localStorage.getItem('defaultActiveMenu')!)
    if (parse1) {
      return parse1.title
    } else {
      return ''
    }
  }
})

// 3 获取当前活动路由 从router中获取 根据路由高亮menu(子层级不会展开有待解决)
// const route = useRoute()
// const activeMenu = computed(() => {
//   const activeMenu = JSON.parse(localStorage.getItem('activeMenu')!)
//   console.log(route.path)
//   return route.name || activeMenu?.path
// })
</script>

<template>
  <div>
    <!--default-active这个属性是根据绑定的index来决定默认显示的菜单-->
    <el-menu
      :collapse="isCollapse"
      :default-active="title"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#1A3351"
      text-color="#fff"
    >
      <h1 class="icon">我是icon</h1>
      <RecursiveMenuComponent :menu-list="props.menuList" />
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
//sidebar高度
.el-menu-vertical-demo {
  height: 100vh;
  .icon {
    height: 50px;
    color: #fff;
    display: grid;
    place-content: center;
    border-bottom: 1px solid grey;
  }
}
</style>
