import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const isLogin = ref(false)

  return { isLogin }
})
