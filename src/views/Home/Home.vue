<template>
  <div style="display: flex;">
    <el-menu
      background-color="#f3f3f3"
      style="flex: 0.15; height: 100vh;"
      :router="true"
      default-active="1"
    >
      <el-menu-item index="1" route="/ground">
        <el-icon><location /></el-icon>
        <span>博客广场</span>
      </el-menu-item>
      <el-menu-item index="2" route="/postBlog">
        <el-icon><document /></el-icon>
        <span>发布博客</span>
      </el-menu-item>
<!--      <el-menu-item index="3" route="/myBlog">-->
<!--        <el-icon><User /></el-icon>-->
<!--        <span>我的博客</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="4" route="/setting">
        <el-icon><setting /></el-icon>
        <span>账号设置</span>
      </el-menu-item>
      <el-menu-item index="5" route="/user" v-if="role === 'administrator'" >
        <el-icon><User /></el-icon>
        <span>人员管理</span>
      </el-menu-item>
    </el-menu>
    <div style="flex: 1; height: 100vh">
    <router-view/>
    </div>
  </div>

</template>

<script setup lang="ts">

import {Avatar, Document, Location, Setting, User} from "@element-plus/icons-vue";
import {useLoginStore} from "@/stores/loginStore.ts";

const loginStore = useLoginStore()
const role = loginStore.role
</script>


<style scoped>

</style>
