<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHeaderStore } from '@/stores'
import type { MenuItem } from '@/types/menuItem'
import { useRouter } from 'vue-router'
import { clearLocalStorage } from '@/utils/clearLocalStorage'

// 1 展开或者折叠
const headerStore = useHeaderStore()
const FoldOrExpand = ref('Fold')
const isExpand = () => {
  if (FoldOrExpand.value === 'Fold') {
    FoldOrExpand.value = 'Expand'
    headerStore.isCollapse = true
  } else {
    FoldOrExpand.value = 'Fold'
    headerStore.isCollapse = false
  }
}

// 2 面包屑 使用仓库数据需要响应式用计算属性或者函数
const breadcrumbList = computed(() => {
  return headerStore.breadcrumbList
})

// 3 tag
const tagList = computed(() => {
  return headerStore.tagList
})

// 4 removeTag
const removeTag = (tag: MenuItem) => {
  headerStore.removeTag(tag)
}

// 5 logout
const router = useRouter()
const logout = () => {
  ElMessageBox.confirm('是否退出', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 清空本地缓存
    clearLocalStorage()
    router.push('/login')
    ElMessage({
      type: 'success',
      message: '成功退出'
    })
  })
}
</script>

<template>
  <div class="header">
    <!--左边-->
    <div class="left-content">
      <component class="expandOrFold" @click="isExpand" :is="FoldOrExpand" />
      <!--面包屑-->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in breadcrumbList"
          :key="item.title"
          :to="{ path: `${item.path ? item.path : ''}` }"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!--右边-->
    <div class="right-content">
      <el-dropdown trigger="click">
        <div class="el-dropdown-link">
          <img src="@/assets/goods4.png" alt="" />
          <el-icon><ArrowDownBold /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User">个人中心</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!--tag-->
  <div class="tag">
    <el-tag
      v-for="(item, index) in tagList"
      :key="index"
      :closable="index !== 0"
      @close="removeTag(item)"
      >{{ item.title }}</el-tag
    >
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  .left-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .bread {
      margin-left: 10px;
    }
    .expandOrFold {
      width: 30px;
      height: 30px;
      cursor: pointer;
      &:hover {
        color: #4930b7;
      }
    }
  }
  .right-content {
    display: flex;
    align-content: center;
    justify-content: center;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 25px;

      img {
        display: flex;
        align-items: center;
        justify-content: center;
        object-fit: fill;
        border-radius: 99999px;
        width: 40px;
        height: 40px;
        box-shadow: 1px 1px 1px 1px #f5f5f5;
      }
      .el-icon--right {
        color: black;
        font-size: 110px;
      }
    }
  }
}
.tag {
  box-shadow: 0 5px 10px -10px black;
  padding: 5px;
  display: flex;
  justify-content: left;
  gap: 10px;
  align-items: center;
  height: 45px;
  border-bottom: 1px solid #dcdfe6;
}
</style>
