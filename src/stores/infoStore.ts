import { defineStore } from 'pinia'

export const useInfoStore = defineStore('useInfoStore', () => {
  const isLike = {}
  return {
    isLike
  }
},{
  persist: true
})
