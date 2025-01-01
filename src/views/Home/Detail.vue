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
      <MdPreview :id="id" :modelValue="showInfo.content" style="max-height: 20vh" />
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
          <div style="overflow: auto; max-height: 25vh" v-infinite-scroll="loadMore">
            <div v-for="comment of commentData"  style="display: flex;flex-direction: column; gap: 10px; justify-content: start">
              <span style="display: flex;justify-content: space-between">
                <span style="display: flex; gap:10px; align-items: center">
                  <span style="font-size: 1.2rem">{{ comment.username }}:</span>
                  <span>{{ comment.content }}</span>
                </span>
                <span>
                  <el-button plain size="small" @click="toggleReply(comment)" >回复</el-button>
                  <el-button type="danger" v-if="comment.isMyComment || role === 'administrator' || role === 'root'" size="small" @click="deleteComment(comment.comment_id)">删除</el-button>
                  <el-button type="primary" v-if="comment.isMyComment || role === 'administrator' || role === 'root' " size="small" @click="editComment(comment.comment_id)">编辑</el-button>
                </span>
              </span>
              <div v-if="comment.replying">
                <span style="display: flex; gap: 20px;align-items: center">
                  <el-input type="text" v-model="comment.replyContent"/>
                  <el-button type="success" @click="handleReplay(comment)" size="small" >发布回复</el-button>
                </span>
                <div style="display: flex;gap: 2px; flex-direction: column;margin-top: 10px">
                  <div v-for="reply in comment.replies" >
                    <span style="display: flex;justify-content: space-between;align-items: center">
                      <span style="display: flex; gap:10px; align-items: center; margin-left: 10px;">
                        <span >{{ reply.username }}:</span>
                        <span style="font-size: 0.8rem">{{ reply.content }}</span>
                      </span>
                      <span style="display: flex;gap: 10px;align-items: center">
                        <el-icon style="cursor: pointer;" @click="deleteComment(reply.comment_id, comment)" v-if=" reply.isMyReply|| role === 'administrator' || role === 'root'"><Delete /></el-icon>
                        <el-icon style="cursor: pointer" @click="openEditReplyDialog(reply,comment)" v-if="reply.isMyReply || role === 'administrator' || role === 'root'"><Edit /></el-icon>
                      </span>
                    </span>
                  </div>
                  <el-pagination
                    :current-page="replayPage[comment.comment_id]"
                    :page-size="replayPageSize"
                    :total="totalReplay[comment.comment_id]"
                    @current-change="(page) => getReplyComment(comment, page)"
                    style="margin-top: 10px; align-self: center;"
                  />
                </div>
                <div>
                </div>
              </div>
              <el-divider style="margin: 15px 0" />
            </div>
          </div>

        </template>

      </el-card>
    </div>
    <el-dialog title="修改回复" v-model="showEditReplyDialog">
      <el-input
        type="textarea"
        :rows="2"
        resize="none"
        v-model="editReplyContent"
      />
      <template #footer>
        <el-button @click="showEditReplyDialog = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmEditReply(parentComment_)"
        >确认</el-button
        >
      </template>
    </el-dialog>

    <el-dialog title="修改评论" v-model="showEdit">
      <el-input type="textarea" :rows="2" resize="none" v-model="editContent" />
      <template #footer>
          <el-button @click="showEdit = false">取消</el-button>
          <el-button type="primary" @click="confirmEditComment">
            确认
          </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import fetchRequest from "@/utils/request.ts";
import {nextTick, onMounted, ref} from "vue";
import {ElNotification} from "element-plus";
import {Delete, Edit, View} from "@element-plus/icons-vue";
import {useInfoStore} from "@/stores/infoStore.ts";
import {useLoginStore} from "@/stores/loginStore.ts";
const articleId = Number(localStorage.getItem('article_id'))
const showInfo = ref()
const infoStore = useInfoStore()
const commentContent = ref("")
const commentData = ref()
const loginStore = useLoginStore()
const showEdit = ref(false)
const editContent = ref("")
const role = ref(loginStore.role)
const editReplyId = ref(null); // 当前正在编辑的回复 ID
const editReplyContent = ref(""); // 编辑中的回复内容
const showEditReplyDialog = ref(false); // 控制编辑回复的模态框显示
const editCommentId = ref(-1)
const parentComment_= ref("2")
const page = ref(0); // Keep track of the current page for pagination
const pageSize = 10; // Define how many comments to load per page
const replayPage = ref({});
const totalReplay = ref({});
const replayPageSize = 5;
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const scrollElement = document.documentElement;
const isLike = ref(infoStore.isLike[articleId] ?? false);
// 打开编辑回复模态框
const openEditReplyDialog = (reply,comment) => {
  parentComment_.value = comment
  editReplyId.value = reply.comment_id;
  editReplyContent.value = reply.content;
  showEditReplyDialog.value = true;
};

// 确认编辑回复
const confirmEditReply = async (parentComment) => {
  const res = await fetchRequest("/blog/comments", {
    method: "PUT",
    body: {
      comment_id: editReplyId.value,
      content: editReplyContent.value,
    },
  });

  if (res.code === 200) {
    // 更新对应的回复内容
    console.log(parentComment)
    const reply = parentComment.replies.find(
      (r) => r.comment_id === editReplyId.value
    );
    if (reply) {
      reply.content = editReplyContent.value;
    }

    ElNotification.success("修改成功");
    showEditReplyDialog.value = false;
  } else {
    ElNotification.error(res.message || "修改失败");
  }
};

const deleteComment = async (comment_id, parentComment = null) => {
  const res = await fetchRequest("/blog/comments", {
    method: "DELETE",
    body: {
      comment_id: comment_id,
    },
  });

  if (res.code === 200) {
    if (parentComment) {
      // 如果是回复，移除父评论的 replies 中的对应回复
      parentComment.replies = parentComment.replies.filter(
        (reply) => reply.comment_id !== comment_id
      );
    } else {
      // 如果是评论，移除 commentData 中的对应评论
      commentData.value = commentData.value.filter(
        (comment) => comment.comment_id !== comment_id
      );
    }

    ElNotification.success("删除成功");
  } else {
    ElNotification.error(res.message || "删除失败");
  }
};

const editComment = (commentId) => {
  showEdit.value = true
  editCommentId.value = commentId
}
if (!infoStore.isLike[articleId]) {
  const storedLikes = JSON.parse(localStorage.getItem('isLike') || '{}');
  infoStore.isLike = storedLikes;
  isLike.value = storedLikes[articleId] ?? false;
}
onMounted(() => {
  const userId = loginStore.userId; // 获取当前登录用户 ID
  const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');

  // 初始化点赞状态
  isLike.value = userLikes[userId]?.[articleId] ?? false;

  // 拉取文章详情和评论
  getInfo();
  getCommentData();
});

const handleReplay = (comment) => {
  postReply(comment);
  setTimeout(() =>{},1000);
  getReplyComment(comment,0)
}

const confirmEditComment = async () => {
  const res = await fetchRequest('/blog/comments', {
    method: "PUT",
    body: {
      comment_id: editCommentId.value,
      content: editContent.value
    }
  });

  if (res.code === 200) {
    ElNotification.success("修改成功");

    // 重置分页为第一页，清空评论数据，并重新加载评论
    page.value = 0; // 重置页码为第一页
    commentData.value = []; // 清空现有评论数据
    await getCommentData(); // 重新获取评论数据

    showEdit.value = false; // 隐藏编辑框
  } else {
    ElNotification.error(res.message || "修改失败");
  }
};

const toggleReply = (comment) => {
  if (!comment || typeof comment !== "object") {
    console.error("Invalid comment object in toggleReply:", comment);
    return;
  }

  // 初始化该评论的分页信息
  if (!totalReplay.value[comment.comment_id]) {
    totalReplay.value[comment.comment_id] = 0;
  }
  if (!replayPage.value[comment.comment_id]) {
    replayPage.value[comment.comment_id] = 0;
  }

  comment.replying = !comment.replying; // 切换回复框显示状态

  // 如果需要显示回复框且尚未加载过回复，获取回复数据
  if (comment.replying && comment.replies.length === 0) {
    getReplyComment(comment);
  }
};




const getReplyComment = async (comment, page = ++replayPage.value[comment.comment_id]) => {
  if (!comment || typeof comment !== "object" || !comment.comment_id) {
    console.error("Invalid comment object:", comment);
    return;
  }

  try {
    const res = await fetchRequest("/blog/comments", {
      params: {
        article_id: articleId,
        comment_id: comment.comment_id,
        page: page,
        size: replayPageSize
      },
    });

    if (res.code === 200) {
      replayPage.value[comment.comment_id] = page;
      totalReplay.value[comment.comment_id] = res.pagination.total_count;

      const replies = res.data.map((reply) => ({
        ...reply,
        username: "未知用户", // 默认用户名
        isMyReply: reply.creater_id === loginStore.userId, // 判断是否为自己的回复
      }));

      // 获取每个回复的用户名
      const promises = replies.map(async (reply) => {
        const userRes = await fetchRequest(`/user/${reply.creater_id}`, {
          method: "GET",
        });
        if (userRes.code === 200) {
          reply.username = userRes.data.username;
        }
      });

      await Promise.all(promises);

      // 确保给正确的 comment 对象赋值
      comment.replies = replies;
    } else {
      console.error("Failed to fetch replies:", res.message);
    }
  } catch (error) {
    console.error("Error fetching replies:", error);
  }
};


const postReply = async (comment) => {
  if (!comment.replyContent.trim()) {
    ElNotification.warning("回复内容不能为空！");
    return;
  }

  const res = await fetchRequest("/blog/comments", {
    method: "POST",
    body: {
      article_id: articleId,
      parent_id: comment.comment_id, // 父评论 ID
      root_id: comment.comment_id,
      content: comment.replyContent,
    },
  });

  if (res.code === 200) {
    const newReply = {
      comment_id: res.data.comment_id, // 新回复的 ID（从后端返回）
      content: comment.replyContent,  // 新回复的内容
      username: loginStore.username,  // 当前用户的用户名
      creater_id: loginStore.userId,  // 当前用户的 ID
    };

    // 将新回复添加到当前评论的 replies 数组中
    comment.replies.push(newReply);

    comment.replyContent = ""; // 清空回复框
    ElNotification.success("回复成功");
  } else {
    ElNotification.error(res.message);
  }
};

const postComment = async () => {
  if (!commentContent.value.trim()) {
    ElNotification.warning("评论内容不能为空！");
    return;
  }
  const res = await fetchRequest("/blog/comments", {
    method: "POST",
    body: {
      article_id: articleId,
      content: commentContent.value,
    },
  });

  if (res.code === 200) {
    commentContent.value = ""; // 清空评论框
    ElNotification.success("发布成功");

    // 发布成功后重置分页并刷新评论列表
    page.value = 0; // 重置分页页码
    commentData.value = []; // 清空现有评论数据
    setTimeout(() =>{},500)
    await getCommentData(); // 重新获取评论数据
  } else {
    ElNotification.error(res.message);
  }
};





const getCommentData = async () => {
  const res = await fetchRequest("/blog/comments", {
    method: "GET",
    params: {
      article_id: articleId,
      size: pageSize,
      page: ++page.value, // 请求下一页数据
    },
  });

  if (res.code === 200) {
    const tempComments = res.data.map((item) => ({
      ...item,
      isMyComment: loginStore.userId === item.creater_id,
      replying: false, // 是否显示回复框
      replyContent: "", // 当前正在输入的回复内容
      replies: [], // 初始化为空数组
      username: "加载中...", // 用户名占位符
    }));

    // 异步获取评论者的用户名
    await Promise.all(
      tempComments.map(async (comment) => {
        const userRes = await fetchRequest(`/user/${comment.creater_id}`, {
          method: "GET",
        });
        if (userRes.code === 200) {
          comment.username = userRes.data.username;
        }
      })
    );

    // 将新评论追加到现有数据
    commentData.value = [...(commentData.value || []), ...tempComments];
  } else if (res.code === 404) {
    // 没有更多评论
  } else {
    ElNotification.error(res.message || "加载评论失败");
  }
};


const loadMore = () => {
  getCommentData();
};



const handleLikeClick = async () => {
  try {
    const res = await fetchRequest("/blog/articles/like", {
      method: "PUT",
      body: { article_id: articleId },
    });

    if (res.code === 200) {
      const userId = loginStore.userId; // 获取当前登录用户 ID
      const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');

      // 更新点赞状态
      isLike.value = !isLike.value;

      // 初始化该用户的点赞数据
      if (!userLikes[userId]) {
        userLikes[userId] = {};
      }

      // 更新当前用户的点赞状态
      userLikes[userId][articleId] = isLike.value;

      // 更新本地存储
      localStorage.setItem('userLikes', JSON.stringify(userLikes));

      // 更新界面上的点赞数
      showInfo.value.likes = res.data.likes;

      ElNotification.success(
        isLike.value ? "点赞成功！" : "取消点赞成功！"
      );
    } else {
      ElNotification.error(res.message || "操作失败");
    }
  } catch (error) {
    ElNotification.error("服务器出错，操作失败");
  }
};

const getInfo = async () => {
  const res = await fetchRequest(`/blog/articles/${ articleId }`, {
    method: 'GET'
  })

  if(res.code === 200){
    showInfo.value = res.data
  } else {
    ElNotification.error(res.massage)
  }
}

</script>

<style scoped>

</style>
