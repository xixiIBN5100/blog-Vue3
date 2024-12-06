<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">Please sign in to continue</p>

      <div class="form-group">
        <label>Username</label>
        <el-input
          v-model="loginData.username"
          placeholder="Enter your username"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <el-input
          v-model="loginData.password"
          type="password"
          placeholder="Enter your password"
          show-password
        />
      </div>

      <el-button class="login-btn" type="primary">
        Sign In
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>

      <div class="additional-links">
        <a href="#">Create Account</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loginData = ref({
  username: "",
  password: ""
})
</script>

<style scoped>
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

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #444;
  font-size: 14px;
  font-weight: 500;
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

.divider {
  margin: 0 10px;
  color: #999;
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
