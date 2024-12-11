<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><location /></el-icon> <span>博客广场</span>
    </TitleBar>

    <div style="padding: 40px;margin-top: 30px">
      <el-scrollbar max-height="80vh">
        <div style="display: flex; flex-direction: column; gap: 20px">
          <div v-for="post of showData" >
            <el-card>
              <template #header>
                {{ post.title }}
              </template>
              <div>
                {{ post.content }}
              </div>
              <template #footer>
                <span style="display: flex;justify-content: space-between">
                  <span style="display: flex;align-items: center;gap: 10px"><el-icon><View /></el-icon> {{ post.views }} </span>
                  <span> <el-button plain>查看文章</el-button></span>
                </span>
              </template>
            </el-card>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import {Location, View} from "@element-plus/icons-vue";
import {ref} from "vue";

const showData = ref( [
  {
    article_id: 1,
    title: "my third post",
    content: "hello world",
    creater_id: 1,
    modifier_id: 1,
    created_at: "2024-12-03 17:08:25",
    updated_at: "2024-12-03 17:08:25",
    likes: 0,
    views: 0
  },
  {
    article_id: 2,
    title: "my third post",
    content: "hello world",
    creater_id: 1,
    modifier_id: 1,
    created_at: "2024-12-03 17:08:27",
    updated_at: "2024-12-03 17:08:27",
    likes: 0,
    views: 0
  },
  {
    article_id: 2,
    title: "my third post",
    content: "hello world",
    creater_id: 1,
    modifier_id: 1,
    created_at: "2024-12-03 17:08:27",
    updated_at: "2024-12-03 17:08:27",
    likes: 0,
    views: 0
  },
  {
    article_id: 2,
    title: "my third post",
    content: "hello world",
    creater_id: 1,
    modifier_id: 1,
    created_at: "2024-12-03 17:08:27",
    updated_at: "2024-12-03 17:08:27",
    likes: 0,
    views: 0
  },
  {
    article_id: 2,
    title: "my third post",
    content: "hello world",
    creater_id: 1,
    modifier_id: 1,
    created_at: "2024-12-03 17:08:27",
    updated_at: "2024-12-03 17:08:27",
    likes: 0,
    views: 0
  }
])
</script>

<style scoped>

</style>
