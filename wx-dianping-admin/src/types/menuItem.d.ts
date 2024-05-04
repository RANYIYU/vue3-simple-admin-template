/**
 * 菜单项类型
 */
export interface MenuItem {
  title: string
  icon: string
  path: string
  name: string
  component?: any
  meta?: any
  redirect?: string
  children?: MenuItem[]
}
