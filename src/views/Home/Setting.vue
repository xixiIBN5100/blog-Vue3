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
      <el-button type="success" style="width: 100%" @click="handleClick" >确认更改</el-button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import {Setting} from "@element-plus/icons-vue";
import TitleBar from "@/components/titleBar.vue";
import {onMounted, ref} from "vue";
import fetchRequest from "@/utils/request.ts";
import {useLoginStore} from "@/stores/loginStore.ts";
import {ElNotification} from "element-plus";

const loginStore = useLoginStore()
const submitForm = ref({
  user_id: "",
  username: "",
  email: "",
  role: "",
  old_password: "",
  new_password: ""
})

onMounted(() => {
  getInfo()
})

const getInfo = async () => {
  try {
    const res = await fetchRequest(`/user/${loginStore.userId}`, {
      method: "GET",
    })
    if(res.code === 200){
      Object.assign(submitForm.value, res.data)
      console.log(submitForm.value)
    } else {
      ElNotification.error(res.message)
    }
  } catch (e) {
    ElNotification.error(e)
  }

}

const handleClick = async () => {
  try{
    const res = await fetchRequest("/user/put", {
      method: "PUT",
      body: submitForm.value
    })

    if(res.code === 200) {
      ElNotification.success("修改成功")
      submitForm.value.new_password = ""
      submitForm.value.old_password = ""
    } else {
      ElNotification.error(res.msg)
    }
  } catch (e) {
    ElNotification.error(e)
  }
}
</script>
<style scoped>

</style>
