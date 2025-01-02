<template>
  <div style="height: 100vh;">
    <TitleBar>
      <el-icon><location /></el-icon> <span>博客广场</span>
    </TitleBar>

    <div style="padding: 40px; margin-top: 30px">
      <div style="display: flex; justify-content: center">
        <el-input
          v-model="searchContent"
          style="max-width: 600px"
          placeholder="Please input"
        >
          <template #prepend>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>
        <el-radio-group v-model="sort" @change="handleSortChange" style="margin-left: 20px">
          <el-radio-button value="popular" label="按热度"></el-radio-button>
          <el-radio-button value="asc" label="最新"></el-radio-button>
          <el-radio-button value="desc" label="最早"></el-radio-button>
        </el-radio-group>
      </div>
      <ul v-infinite-scroll="loadMore" style="overflow: auto; max-height: 75vh">
        <div style="display: flex; flex-direction: column; gap: 20px" v-if="showData.length">
          <div v-for="post of showData" :key="post.article_id">
            <el-card>
              <template #header>
                {{ post.title }}
              </template>
                <span style="display: flex;justify-content: space-between">
                  <span style="display: flex;align-items: center;gap: 10px"><el-icon><View /></el-icon> {{ post.views }} </span>
                  <span>
                    <el-button plain @click="handleClick(post.article_id)">查看文章</el-button>
                    <el-button v-if="role === 'administrator'|| role === 'root' || isMy(post.creater_id)" type="primary" @click="editPost(post)">修改</el-button>
                    <el-button v-if="role === 'administrator'|| role === 'root' || isMy(post.creater_id)" type="danger" @click="confirmDelete(post.article_id)">删除</el-button>
                  </span>
                </span>
            </el-card>
          </div>
        </div>
      </ul>
    </div>

    <!-- 删除确认弹窗 -->
    <el-dialog title="删除确认" v-model="isShowDeleteConfirm">
      <span>确定要删除这篇文章吗？</span>
      <template #footer>
        <el-button @click="isShowDeleteConfirm = false">取消</el-button>
        <el-button type="danger" @click="deletePost">删除</el-button>
      </template>
    </el-dialog>

    <!-- 编辑文章弹窗 -->
    <el-dialog title="修改博客" v-model="isShowEdit">
      <el-input
        v-model="editTitle"
        style="margin-bottom: 20px"
        placeholder="请输入标题"
      />
      <MdEditor
        v-model="editContent"
      />
      <template #footer>
        <el-button @click="isShowEdit = false">取消</el-button>
        <el-button type="primary" @click="confirmEditPost">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "@/components/titleBar.vue";
import { Location, Search, View } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import fetchRequest from "@/utils/request.ts";
import router from "@/router";
import { useLoginStore } from "@/stores/loginStore.ts";
import { ElNotification } from "element-plus";
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const editContent = ref(""); // 编辑文章的内容
const editTitle = ref(""); // 编辑文章的标题
const curPage = ref(1); // 当前分页，初始为 1
const searchPage = ref(1); // 搜索模式的分页
const showData = ref([]); // 用于展示的文章数据
const searchContent = ref(""); // 搜索内容
const isSearching = ref(false); // 当前是否为搜索模式
const hasMoreData = ref(true); // 是否还有更多数据
const isShowEdit = ref(false); // 是否显示编辑弹窗
const isShowDeleteConfirm = ref(false); // 删除确认对话框
const deletePostId = ref(null); // 存储待删除的文章ID
const editingPostId = ref(null); // 存储当前正在编辑的文章ID

const loginStore = useLoginStore();
const userId = loginStore.userId;
const role = loginStore.role;

const sort = ref("popular")
onMounted(() => {
  getBlog();
});
const handleSortChange = () => {
  // 切换排序时，清空数据并重置分页
  curPage.value = 1; // 重置普通模式分页
  searchPage.value = 1; // 重置搜索模式分页
  showData.value = []; // 清空当前展示的数据
  hasMoreData.value = true; // 恢复加载更多的能力

  // 重新获取文章列表数据
  getBlog(searchContent.value, isSearching.value, true);
};

const confirmEditPost = async () => {
  if (!editTitle.value || !editContent.value) {
    ElNotification.error("标题和内容不能为空！");
    return;
  }

  const res = await fetchRequest("/blog/articles", {
    method: "PUT",
    body: {
      article_id: editingPostId.value,
      title: editTitle.value,
      content: editContent.value,
    },
  });

  if (res.code === 200) {
    // 更新成功，更新数据
    const updatedPost = { ...showData.value.find(post => post.article_id === editingPostId.value), title: editTitle.value, content: editContent.value };
    showData.value = showData.value.map(post => post.article_id === editingPostId.value ? updatedPost : post);
    ElNotification.success("文章更新成功");

    // 关闭编辑弹窗
    isShowEdit.value = false;
    editingPostId.value = null;
    editTitle.value = "";
    editContent.value = "";
  } else {
    ElNotification.error("文章更新失败");
  }
};

const editPost = (post) => {
  // 设置当前编辑的文章数据
  editTitle.value = post.title;
  editContent.value = post.content;
  editingPostId.value = post.article_id;

  // 显示编辑弹窗
  isShowEdit.value = true;
};

const confirmDelete = (articleId: string) => {
  // 显示删除确认弹窗
  deletePostId.value = articleId;
  isShowDeleteConfirm.value = true;
};

const deletePost = async () => {
  if (deletePostId.value === null) return;

  const res = await fetchRequest("/blog/articles", {
    method: "DELETE",
    body: {
      article_id: deletePostId.value,
    },
  });

  if (res.code === 200) {
    // 删除成功，更新数据
    showData.value = showData.value.filter(post => post.article_id !== deletePostId.value);
    ElNotification.success("删除成功");
  } else {
    ElNotification.error("删除失败");
  }

  // 关闭删除确认弹窗
  isShowDeleteConfirm.value = false;
  deletePostId.value = null;
};

const isMy = (createrId) => {
  return userId === createrId;
};

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

const getBlog = async (keyword = undefined, search = false, isSort = false) => {
  let page = undefined
  if(!isSort){
    page = search ? searchPage.value : curPage.value;
  } else {

  }


  const res = await fetchRequest("/blog/articleList", {
    method: "GET",
    params: {
      page: page,
      size: 6,
      sort: sort.value,
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
