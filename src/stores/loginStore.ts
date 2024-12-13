import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const isLogin = ref(false)
  const userId = ref(-1)
  const role = ref()
  return {
    isLogin,
    userId,
    role
  }
}, {
  persist: true
})
