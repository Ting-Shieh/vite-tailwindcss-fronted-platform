<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <header-search class="mr-1"></header-search>
      <header-theme class="mr-1"></header-theme>
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