<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><location /></el-icon> <span>博客广场</span>
    </TitleBar>

    <div style="padding: 40px;margin-top: 30px" >
      <div style="display: flex;justify-content: center">
        <el-input
          v-model="searchContent"
          style="max-width: 900px"
          placeholder="Please input"
        >
          <template #prepend>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>
      </div>
      <ul v-infinite-scroll="loadMore" style="overflow: auto; max-height: 75vh">
        <div style="display: flex; flex-direction: column; gap: 20px" v-if="showData.length">
          <div v-for="post of showData" :key="post.article_id">
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
import {Location, Search, View} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import fetchRequest from "@/utils/request.ts";
import router from "@/router";

const curPage = ref(1); // 当前分页，初始为 1
const searchPage = ref(1); // 搜索模式的分页
const showData = ref([]); // 用于展示的文章数据
const searchContent = ref(""); // 搜索内容
const isSearching = ref(false); // 当前是否为搜索模式
const hasMoreData = ref(true); // 是否还有更多数据

onMounted(() => {
  getBlog();
});

const search = async () => {
  // 切换到搜索模式
  isSearching.value = true;
  searchPage.value = 1;
  hasMoreData.value = true;
  await getBlog(searchContent.value, true);
};

const loadMore = async () => {
  if (!hasMoreData.value) return; // 没有更多数据时直接返回

  if (isSearching.value) {
    // 搜索模式下加载更多
    await getBlog(searchContent.value, true);
  } else {
    // 普通模式加载更多
    await getBlog();
  }
};

const getBlog = async (keyword = undefined, search = false) => {
  // 根据是否为搜索模式选择分页
  const page = search ? searchPage.value : curPage.value;

  const res = await fetchRequest("/blog/articleList", {
    method: "GET",
    params: {
      page: page,
      size: 4,
      ...(keyword && { keyword }),
    },
  });

  if (res.code === 200) {
    if (search) {
      if (searchPage.value === 1) {
        showData.value = res.data; // 首次搜索，覆盖数据
      } else {
        showData.value = [...showData.value, ...res.data]; // 加载更多，追加数据
      }
      searchPage.value++; // 搜索分页递增
    } else {
      if (curPage.value === 1) {
        showData.value = res.data; // 首次加载，覆盖数据
      } else {
        showData.value = [...showData.value, ...res.data]; // 加载更多，追加数据
      }
      curPage.value++; // 普通分页递增
    }

    // 判断是否还有更多数据
    if (res.data.length < 4) {
      hasMoreData.value = false;
    }
  } else {
    hasMoreData.value = false; // 请求失败或没有更多数据
  }
};

const handleClick = (article_id: string) => {
  localStorage.setItem("article_id", article_id);
  router.push("/detail");
};
</script>

<style scoped></style>
