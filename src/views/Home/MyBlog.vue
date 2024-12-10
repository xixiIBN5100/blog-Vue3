<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import {Avatar, User} from "@element-plus/icons-vue";
</script>

<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><User /></el-icon><span>我的博客</span>
    </TitleBar>
  </div>
</template>

<style scoped>

</style>
