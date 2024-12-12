<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><location /></el-icon> <span>博客广场</span>
    </TitleBar>

    <div style="padding: 40px;margin-top: 30px" >
      <ul v-infinite-scroll="getBlog"  style="overflow: auto; max-height: 75vh">
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
                  <span> <el-button plain @click="handleClick(post.article_id)" >查看文章</el-button></span>
                </span>
              </template>
            </el-card>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import {Location, View} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import fetchRequest from "@/utils/request.ts";
import router from "@/router";
const curPage = ref(0)
const showData = ref([])

onMounted(() => {
  getBlog()
  console.log(showData.value)
})

const getBlog = async () => {
  curPage.value++
    const res = await fetchRequest("/blog/articleList", {
      method: "GET",
      params: {
        page: curPage.value,
        size: 4
      }
    })

    if (res.code === 200) {
      if(showData.value.length === 0){
        showData.value = res.data
      } else {
        showData.value = [...showData.value, ...res.data]
        console.log(showData.value)
      }
    }
}

const handleClick = (article_id) => {
  localStorage.setItem("article_id", article_id)
  router.push("/detail")
}
</script>

<style scoped>

</style>
