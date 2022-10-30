import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 定義軟連結
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData:'@import "./src/styles/index.scss";'
  //     }
  //   }
  // } 
})
