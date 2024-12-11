import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const isLogin = ref(false)
  const userId = ref(-1)
  return {
    isLogin,
    userId,
  }
})
