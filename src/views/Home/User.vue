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
        <el-table-column prop="role" label="role" />

        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default="{ row }">
            <el-button link type="danger" size="small" @click="handleDelete(row.user_id)">删除</el-button>
            <el-button link type="primary" size="small" @click="openEditDialog(row)" v-if="row.role !== 'root'">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Edit Dialog -->
    <el-dialog title="编辑用户信息" v-model="editDialogVisible" width="30%">
      <el-form :model="editForm" :rules="rules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="administrator"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "@/components/titleBar.vue";
import { User } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import fetchRequest from "@/utils/request.ts";
import { ElNotification } from "element-plus";
const userData = ref<any[]>([]);

// Edit dialog visibility
const editDialogVisible = ref(false);
// Form data for editing
const editForm = ref({
  user_id: "",
  username: "",
  email: "",
  role: "",

});

// Form validation rules
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  role: [{ required: true, message: "角色不能为空", trigger: "change" }],
};

// Reference to form instance
const editFormRef = ref();

// Fetch user list on component mount
onMounted(() => {
  getUserInfo();
});

// Fetch user information
const getUserInfo = async () => {
  const res = await fetchRequest("/userList", {});
  if (res.code === 200) {
    userData.value = res.data;
  }
};

// Open edit dialog and populate form
const openEditDialog = (row: any) => {
  editForm.value = { ...row }; // Clone the row data into the form
  editDialogVisible.value = true;
};

// Submit edited data
const handleEditSubmit = async () => {
  if (!editFormRef.value) return;

  // Validate form before submitting
  editFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await fetchRequest("/user/put", {
        method: "PUT",
        body: {
          ...editForm.value,
        },
      });

      if (res.code === 200) {
        ElNotification.success("修改成功");
        editDialogVisible.value = false;
        await getUserInfo(); // Refresh user list
      } else {
        ElNotification.error(res.message || "修改失败");
      }
    } else {
      ElNotification.error("请填写完整信息");
    }
  });
};

// Handle delete operation
const handleDelete = async (user_id: any) => {
  const res = await fetchRequest("/user/del", {
    method: "DELETE",
    body: { user_id: user_id },
  });

  if (res.code === 200) {
    ElNotification.success("删除成功");
    await getUserInfo();
  }
};
</script>

<style scoped>
/* Add any custom styles you need */
</style>
