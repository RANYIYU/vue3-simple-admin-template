import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menuItem'

export const useHeaderStore = defineStore(
  'header',
  () => {
    // 1 sidebar是否折叠
    const isCollapse = ref<boolean>(false)
    // 2 面包屑导航列表
    const breadcrumbList = ref<MenuItem[]>([
      {
        title: '首页',
        path: '/',
        icon: '',
        children: [],
        name: 'home'
      }
    ])
    // 3 修改面包屑导航列表
    const setBreadcrumbList = (item: MenuItem, ancestors: MenuItem[] | undefined): void => {
      // 处理祖先列表为 undefined 或者为空数组的情况 即1级菜单情况
      if (!ancestors || ancestors.length === 0) {
        breadcrumbList.value = [item]
        return
      }

      // 获取当前面包屑列表的第一个元素
      const firstCrumb: { title: string; path: string } = breadcrumbList.value[0]

      // 如果第一个面包屑与祖先的第一个元素标题相同(表示顶层的parentItem相同)
      if (firstCrumb?.title === ancestors[0].title) {
        // breadcrumbList 是比 ancestors多一个item的需要删除breadcrumbList最后item
        breadcrumbList.value.splice(-1, 1)
        // 如果面包屑长度与祖先长度相同，检查内容是否一致
        if (
          breadcrumbList.value.length === ancestors.length &&
          breadcrumbList.value.every((crumb, index) => crumb.title === ancestors[index].title)
        ) {
          // 内容相同，直接添加当前项
          breadcrumbList.value.push(item)
        } else {
          // 内容不同或长度不同，直接替换
          breadcrumbList.value = [...ancestors, item]
        }
      } else {
        // 第一个面包屑与祖先不同，直接替换
        breadcrumbList.value = [...ancestors, item]
      }
      // // 父类为null表示一定为1级菜单
      // if (ancestors === null || ancestors === undefined || ancestors.length <= 0) {
      //   // 用item 替换 breadcrumbList
      //   breadcrumbList.value = [item]
      // }
      // // 父类存在
      // if (ancestors !== null && ancestors !== undefined && ancestors.length > 0) {
      //   // 判断面包屑列表否存在相同父类
      //   if (breadcrumbList.value[0].title === ancestors[0].title) {
      //     // 移出breadcrumbList最后一个元素(比较的时候breadcrumbList最后一个元素是ancestors中没有的)
      //     breadcrumbList.value.pop()
      //     // 判断两个长度是否相等
      //     const length: boolean = breadcrumbList.value.length === ancestors.length
      //     let isEqual: boolean
      //     // 长度相同 判断 ancestors 和 breadcrumbList 两个数组内容是否相同
      //     if (length) {
      //       isEqual = breadcrumbList.value.every(
      //         (item: { title: string; path: string }, index: number): boolean => {
      //           return item.title === ancestors[index].title
      //         }
      //       )
      //       // 长度和内容都相同则添加
      //       if (isEqual) {
      //         breadcrumbList.value.push(item)
      //       } else {
      //         // 长度相同内容不同则替换
      //         breadcrumbList.value = [...ancestors, item]
      //       }
      //     } else {
      //       // 长度不同则替换
      //       breadcrumbList.value = [...ancestors, item]
      //     }
      //   } else {
      //     // 不存在相同父类 用当前数据替换
      //     breadcrumbList.value = [...ancestors, item]
      //   }
      // }
    }
    // 4 tag
    const tagList = ref<MenuItem[]>([
      {
        title: '首页',
        path: '/',
        icon: '',
        children: [],
        name: 'home'
      }
    ])
    // 5 修改tag
    const setTagList = (item: MenuItem): void => {
      const isExists = tagList.value.find((tag: MenuItem): boolean => {
        return tag.title === item.title
      })
      // 不重复则添加
      if (!isExists) {
        tagList.value.push(item)
      }
    }
    // 6 移除tag
    const removeTag = (item: MenuItem): void => {
      tagList.value = tagList.value.filter((tag: MenuItem): boolean => {
        return tag.title !== item.title
      })
    }
    return {
      isCollapse,
      breadcrumbList,
      setBreadcrumbList,
      tagList,
      setTagList,
      removeTag
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
