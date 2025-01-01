<template>
  <div style="display: flex;">
    <el-menu
      background-color="#f3f3f3"
      style="flex: 0.15; max-height: 300vh;"
      :router="true"
      default-active="1"
    >
      <el-menu-item index="1" route="/ground">
        <el-icon><location /></el-icon>
        <span>博客广场</span>
      </el-menu-item>
      <el-menu-item index="2" route="/postBlog" v-if="role === 'administrator' || role === 'root'">
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
      <el-menu-item index="5" route="/user" v-if="role === 'administrator' || role === 'root'" >
        <el-icon><User /></el-icon>
        <span>人员管理</span>
      </el-menu-item>
      <div style="display: flex;justify-content: center;margin-top: 70vh;width: 100%">
        <el-button type="danger" @click="logOut">退出登录</el-button>
      </div>
    </el-menu>
    <div style="flex: 1; height: 100vh">
    <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Avatar, Document, Location, Setting, User} from "@element-plus/icons-vue";
import {useLoginStore} from "@/stores/loginStore.ts";
import router from "@/router";

const loginStore = useLoginStore()
const role = loginStore.role

const logOut = () => {
  document.cookie = "PHPSESSID = ''"
  router.push("/")
}
</script>


<style scoped>

</style>
