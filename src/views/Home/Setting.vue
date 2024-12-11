<template>
<div style=" height: 100vh;" >
  <TitleBar>
    <el-icon><setting /></el-icon> <span>账号设置</span>
  </TitleBar>

  <div style="padding: 40px;margin-top: 30px; display: flex;flex-direction: column;justify-content: space-between; height: 80%">
    <el-form size="large">
      <el-form-item label="账号" >
        <el-input  v-model="submitForm.username" disabled  />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input  v-model="submitForm.email" disabled />
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input  v-model="submitForm.old_password"  />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input  v-model="submitForm.new_password" />
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: center;width: 100%">
      <el-button type="success" style="width: 100%">确认更改</el-button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import {Setting} from "@element-plus/icons-vue";
import TitleBar from "@/components/titleBar.vue";
import {ref} from "vue";

const submitForm = ref({
  user_id: "",
  username: "",
  email: "",
  role: "",
  old_password: "",
  new_password: ""
})
</script>
<style scoped>

</style>
