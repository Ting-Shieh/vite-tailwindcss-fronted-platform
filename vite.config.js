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
  },
  // 代理
  server: {
    proxy: {
      // 代理所有 /api 的請求，該請求將被代理到 target 中
      '/api': {
        // 代理請求後的請求地址
        target: 'https://api.imooc-front.lgdsunday.club/',
        // 跨域
        changeOrigin: true
      }
      

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
