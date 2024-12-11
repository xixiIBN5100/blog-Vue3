
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
          <el-input type="textarea" placeholder="请输入内容" v-model="submitForm.content" maxlength="1000" show-word-limit :rows="30" resize="none" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: center;width: 100%">
            <el-button type="success" style="width: 100%">发布</el-button>
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

const submitForm = ref({
  title: "",
  content: ""
})
</script>

<style scoped>

</style>
