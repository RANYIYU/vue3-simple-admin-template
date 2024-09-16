<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useMenuStore } from '@/stores/modules/menu'
import type { MenuItem } from '@/types/menuItem'
import { useUserStore } from '@/stores/modules/user'
import {
  extractLeafAndSingleLevelItems,
  getSingleLevelResult
} from '@/utils/extractLeafAndSingleLevelItems'

// 测试数据
const menuData = ref<MenuItem[]>([
  {
    title: '哈哈我是第一个数据',
    icon: 'User',
    path: '/report',
    name: 'report'
  },
  {
    title: '我的名字比较长用来测试宽度',
    icon: 'location',
    path: '',
    name: '',
    // path: '/',
    // name: 'home',
    children: [
      {
        title: '主页',
        icon: 'Notification',
        path: '/home1',
        name: 'home',
        children: [
          {
            title: '主页子页面1',
            icon: 'location',
            path: '/home',
            name: 'home'
          },
          {
            title: '主页子页面2',
            icon: 'location',
            path: '/home2',
            name: 'home',
            children: [
              {
                title: '主页子页面2的子页面1',
                icon: 'location',
                path: '/home3',
                name: 'home4'
              },
              {
                title: '主页子页面2的子页面2',
                icon: 'Search',
                path: '/home123',
                name: 'home5'
              }
            ]
          }
        ]
      },
      {
        title: '子页面2',
        icon: 'Search',
        path: '/home12',
        name: 'home7',
        children: [
          {
            title: '子页面2的子页面1',
            icon: 'Search',
            path: '/home3',
            name: 'home8'
          },
          {
            title: '子页面2的子页面2',
            icon: 'Search',
            path: '/home34',
            name: 'home0'
          }
        ]
      }
    ]
  },
  {
    title: '报表',
    icon: 'el-icon-menu',
    path: '/report',
    name: 'report'
  }
])

const formData = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ]
})

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const menuStore = useMenuStore()
const userStore = useUserStore()
// 1 登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // todo 发送网络请求login
      // ElMessage.success('登录成功')
      // todo 模拟返回token以及菜单数据
      // 设置token
      userStore.setToken('12332112321312312')
      // 设置menu
      menuStore.setMenu(menuData.value)
      // 给现有一级layout路由添加子路由(登录成功之后手动添加动态路由)
      // 但是刷新路由会消失所以需要再main.ts中再次添加一次
      getSingleLevelResult(menuData.value, router)
      // 把第一个路由数据存一下用于 默认活动menu显示
      const result = extractLeafAndSingleLevelItems(menuData.value)
      localStorage.setItem('defaultActiveMenu', JSON.stringify(result[0]))
      // 成功之后跳转
      console.log('登录成功!')
      // 跳转到第一个菜单页面
      console.log(result[0].path)
      await router.push(result[0].path)
    } else {
      console.log('登录错误!', fields)
    }
  })
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form :model="formData" :rules="rules" ref="ruleFormRef" size="large" autocomplete="off">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login(ruleFormRef)" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.svg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
