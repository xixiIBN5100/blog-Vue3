<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><location /></el-icon> <span>博客广场</span>
    </TitleBar>

    <div style="padding: 40px;margin-top: 30px">
      <el-scrollbar max-height="80vh">
        <div style="display: flex; flex-direction: column; gap: 20px" v-if="showData">
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
import {onMounted, ref} from "vue";
import fetchRequest from "@/utils/request.ts";
import {ElNotification} from "element-plus";

const showData = ref()

onMounted(() => {
  getBlog()
  console.log(showData.value)
})

const getBlog = async () => {
  try {
    const res = await fetchRequest("/blog/articleList", {
      method: "GET",
      params: {
        page: 1,
        size: 5
      }
    })

    if (res.code === 200) {
      showData.value = res.data
    } else {

    }
  } catch (e) {
    ElNotification.error(e)
  }
}
</script>

<style scoped>

</style>
