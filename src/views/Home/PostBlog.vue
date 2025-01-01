
<template>
  <div style=" height: 100vh;" >
    <TitleBar>
      <el-icon><document /></el-icon> <span>发布博客</span>
    </TitleBar>

    <div style="padding: 40px;margin-top: 30px">
      <el-form>
        <el-form-item label="博客标题" >
          <el-input placeholder="请输入标题" v-model="submitForm.title" />
        </el-form-item>
        <el-form-item label="博客内容">
          <MdEditor v-model="submitForm.content" style="height: 70vh" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: center;width: 100%">
            <el-button type="success" style="width: 100%"  @click="handleSubmit" >发布</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">

import TitleBar from "@/components/titleBar.vue";
import {Document} from "@element-plus/icons-vue";
import {ref} from "vue";
import fetchRequest from "@/utils/request.ts";
import {ElNotification} from "element-plus";
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const submitForm = ref({
  title: "",
  content: ""
})
const handleSubmit = async () => {
  try {
    const res = await fetchRequest("/blog/articles", {
      method: "POST",
      body: submitForm.value
    });
    if (res.code === 200) {
      submitForm.value.content = ""
      submitForm.value.title = ""
      ElNotification.success("发布成功")
    } else {
      ElNotification.error(res.message)
    }
  } catch (e) {
    ElNotification.error(e)
  }
}
</script>



<style scoped>

</style>
