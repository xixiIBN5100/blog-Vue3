

<template>
  <div style="width: 100%; height: 100%">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    style=""
  >
    <el-menu-item index="0">个人博客系统</el-menu-item>
    <el-menu-item index="1">登录</el-menu-item>
    <el-menu-item index="2">注册</el-menu-item>
  </el-menu>

  <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
