<template>
  <div style=" height: 100vh;" >
    <TitleBar>
       <span>博客详情</span>
    </TitleBar>
    <div style="padding: 10px 30px; margin-top: 10px">
    <el-card v-if="showInfo" >
      <template #header v-if="showInfo.title && showInfo.content">
        {{ showInfo.title }}
      </template>
      <div>
        {{ showInfo.content }}
      </div>
      <template #footer>
        <span style="display: flex;justify-content: space-between">
          <span style="display: flex; gap: 20px; align-items: center">
            <span style="display: flex;align-items: center;gap: 10px"><el-icon><View /></el-icon> {{ showInfo.views }} </span>
            <span style="display: flex;align-items: center;gap: 10px" @click="handleLikeClick" v-if="!isLike" ><svg t="1734007798974" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1470" width="15" height="15" style="cursor: pointer"><path d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667zM544.256 149.333333c39.253333 0 59.498667 36.48 49.888 84.928-7.573333 38.144-21.984 104.426667-43.221333 198.666667-4.512 20.021333 10.56 39.093333 30.912 39.093333h218.666666c6.101333 0 12.16 1.066667 17.909334 3.168 27.445333 9.984 41.674667 40.554667 31.776 68.266667l-85.568 239.573333C744.981333 838.026667 693.301333 874.666667 635.402667 874.666667H223.498667C194.314667 874.666667 170.666667 850.784 170.666667 821.333333V503.498667c0-17.866667 14.144-32.448 31.829333-32.821334l21.866667-0.469333a221.12 221.12 0 0 0 167.381333-82.56c34.346667-42.602667 59.146667-99.306667 74.869333-169.877333C482.101333 166.336 499.552 149.333333 544.266667 149.333333z" fill="#000000" p-id="1471"></path></svg>
            {{ showInfo.likes }}
            </span>
            <span style="display: flex;align-items: center;gap: 10px" @click="handleLikeClick" v-else ><svg t="1734092758001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1496" width="15" height="15"  style="cursor: pointer"><path d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z" fill="#000000" p-id="1497"></path></svg>
            {{ showInfo.likes }}
            </span>
          </span>
        </span>
      </template>
    </el-card>
      <el-card style="margin-top: 20px;">
        <template #header>评论</template>
        <div>
          <el-input type="textarea" :rows="2"  maxlength="200" show-word-limit resize="none" v-model="commentContent" />
          <span style="margin-top:10px;display: flex; justify-content: end"><el-button type="success"  @click="postComment">发布</el-button></span>
        </div>
        <template #footer>
          <div style="overflow: auto; max-height: 55vh">
            <span v-for="comment of commentData"  style="display: flex;flex-direction: column; gap: 10px; justify-content: start">
              {{ comment.content }}
            </span>
          </div>
        </template>

      </el-card>
    </div>


  </div>
</template>

<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import fetchRequest from "@/utils/request.ts";
import {onMounted, ref} from "vue";
import {ElNotification} from "element-plus";
import {View} from "@element-plus/icons-vue";
import {useInfoStore} from "@/stores/infoStore.ts";
const articleId = localStorage.getItem('article_id')
const showInfo = ref()
const infoStore = useInfoStore()
const commentContent = ref("")
const commentData = ref()
const isLike = ref(infoStore.isLike[articleId]? infoStore.isLike[articleId]: false)
if(!infoStore.isLike[articleId]){
  infoStore.isLike[articleId] = false
}
onMounted(() => {
  getInfo()
})

const postComment = async () => {
  const res = await fetchRequest("/blog/comments", {
    method: "POST",
    body: {
      article_id: articleId,
      content: commentContent.value
    }
  })

  if(res.code === 200){
    commentContent.value = ""
    getCommentData()
    ElNotification.success("发布成功")
  }
}

const getCommentData = async () => {
  const res = await fetchRequest("/blog/comments", {
    method: "GET",
    params: {
      article_id: articleId
    }
  })

  if(res.code === 200){
    commentData.value = res.data
  } else {
    ElNotification.error(res.message)
  }
}
const handleLikeClick = async () => {
  const res = await fetchRequest("/blog/articles/like", {
    method: "PUT",
    body: {
      article_id: articleId
    }
  })
  if(res.code === 200){
    isLike.value = !isLike.value
    infoStore.isLike[articleId] = isLike.value
    showInfo.value.likes = res.data.likes
  }
}

const getInfo = async () => {
  const res = await fetchRequest(`/blog/articles/${ articleId }`, {
    method: 'GET'
  })

  if(res.code === 200){
    showInfo.value = res.data
    console.log(showInfo.value)
  } else {
    ElNotification.error(res.massage)
  }
}

</script>

<style scoped>

</style>
