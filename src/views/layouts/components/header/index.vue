<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1
    dark:bg-zinc-800 dark:border-b-zinc-700 duration-500"
  >
    <div class="flex items-center">
      <!-- logo: 點擊返回首頁 -->
      <img
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <!-- search:  搜尋區 -->
      <header-search class="mr-1"></header-search>
      <!-- theme: 主題切換區 -->
      <header-theme class="mr-1"></header-theme>
      <!-- my: 訊息區 -->
      <header-my></header-my>
    </div>
  </div>
</template>
<script setup>
import HeaderSearch from './HeaderSearch/index.vue'
import HeaderTheme from './HeaderTheme.vue'
import HeaderMy from './HeaderMy.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function onToHome () {
  router.push('/')
}
</script>