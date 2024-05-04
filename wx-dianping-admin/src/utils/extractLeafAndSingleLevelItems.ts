//  提取叶子节点和单层节点
import type { MenuItem } from '@/types/menuItem'

export const extractLeafAndSingleLevelItems = (menuData: MenuItem[]): MenuItem[] => {
  const findLeaves = (items: MenuItem[]): MenuItem[] =>
    items.reduce((acc: MenuItem[], item: MenuItem) => {
      if (!item.children || item.children.length === 0) {
        acc.push(item)
      } else {
        acc = acc.concat(findLeaves(item.children))
      }
      return acc
    }, [])

  return findLeaves(menuData)
}

export const getSingleLevelResult = (menuData: MenuItem[], router: any): void => {
  // const routeRecords = ref<RouteRecordRaw[]>([])
  // 可能store和本地缓存都没有数据 一定要加？
  if (!menuData) return
  const result = extractLeafAndSingleLevelItems(menuData)
  result.forEach((item) => {
    // 确保只添加一次
    if (router.hasRoute(item.name)) return
    router.addRoute('layout', {
      path: item.path,
      name: item.name,
      component: () =>
        import(
          // component: () => import('@/views/home/HomeComponent.vue')
          // 拼接 注意文件夹名字和组件名字
          `@/views/${item.name}/${item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}Component.vue`
        )
    })
  })
}
