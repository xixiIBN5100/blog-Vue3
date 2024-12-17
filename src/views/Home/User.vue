<template>
  <div style="height: 100vh;">
    <TitleBar>
      <el-icon><User /></el-icon><span>人员管理</span>
    </TitleBar>
    <div style="margin-top: 30px; padding: 30px">
      <el-table :data="userData" style="width: 100%; height: 80vh">
        <el-table-column prop="user_id" label="user_id" width="180" />
        <el-table-column prop="username" label="username" width="180" />
        <el-table-column prop="email" label="email" />

        <!-- Role Column with Editable Dropdown -->
        <el-table-column label="role">
          <template #default="{ row }">
            <el-select v-model="row.role" size="small" @change="handleRoleChange(row)">
              <el-option label="administrator" value="administrator" />
              <el-option label="user" value="user" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default="{ row }">
            <el-button link type="danger" size="small" @click="handleDelete(row.user_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "@/components/titleBar.vue";
import { User } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import fetchRequest from "@/utils/request.ts";
import {ElNotification} from "element-plus";

const userData = ref<any[]>([]);

onMounted(() => {
  getUserInfo();
});

const getUserInfo = async () => {
  const res = await fetchRequest("/userList", {});
  if (res.code === 200) {
    userData.value = res.data;
  }
};

// Handle role change
const handleRoleChange = async (row: any) => {
  const res = await fetchRequest("/user/put", {
    method: "PUT",
    body: {

    }
  })
};

// Handle delete
const handleDelete = async (user_id: any) => {
  const res = await fetchRequest("/user/del", {
    method: "DELETE",
    body: {
      user_id: user_id
    }
  })
  if(res.code === 200){
    ElNotification.success("删除成功")
    await getUserInfo()
  }
};
</script>

<style scoped>
/* Add any custom styles you need */
</style>
