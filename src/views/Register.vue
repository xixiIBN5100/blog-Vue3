<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome Register</h1>
      <p class="subtitle">Join us now!</p>

      <el-form
        ref="formRef"
        :model="registerData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="email" label="E-mail">
          <el-input
            v-model="registerData.email"
            placeholder="Enter your e-mail"
          />
        </el-form-item>

        <el-form-item prop="username" label="Username">
          <el-input
            v-model="registerData.username"
            placeholder="Enter your username"
          />
        </el-form-item>

        <el-form-item prop="password" label="Password">
          <el-input
            v-model="registerData.password"
            type="password"
            placeholder="Enter your password"
            show-password
          />
        </el-form-item>

        <el-button class="login-btn" type="primary" @click="handleRegister">
          Register
        </el-button>
      </el-form>

      <div class="additional-links">
        <a href="/">Has Account?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import fetchRequest from '@/utils/request';
import { ElNotification } from "element-plus";
import router from "@/router";

const formRef = ref<FormInstance>()

const registerData = ref({
  email: "",
  username: "",
  password: ""
})

// 表单验证规则
const rules = ref<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '长度为6到20位数', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '长度至少为6位数', trigger: 'blur' }
  ]
})

const handleRegister = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      try {
        const data = await fetchRequest('/register', {
          method: 'POST',
          body: registerData.value
        });
        if(data.code === 200) {
          ElNotification.success("Registration successful")
          router.push("/")
        } else {
          ElNotification.error(data.message)
        }
      } catch (e) {
        ElNotification.error(e as string)
      }
    }
  })
}
</script>

<style scoped>
/* 保持原有样式不变 */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 8px 15px;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-btn {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  transition: transform 0.2s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.additional-links {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.additional-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.additional-links a:hover {
  color: #764ba2;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式适配 */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .title {
    font-size: 24px;
  }
}
</style>
