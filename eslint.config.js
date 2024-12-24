import { defineFlatConfig } from 'eslint-define-config'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

export default defineFlatConfig([
  {
    files: ['**/*.{js,ts,vue}'], // 匹配文件
    ignores: ['dist/', 'node_modules/', 'coverage/'], // 忽略的文件夹
  },
  {
    files: ['**/*.ts', '**/*.vue'], // 仅对 TypeScript 和 Vue 文件启用
    languageOptions: {
      parser: parser, // 使用 TypeScript 解析器
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { vue, typescript, prettier }, // 插件
    rules: {
    },
  },
])
