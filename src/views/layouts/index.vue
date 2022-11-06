<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定義 h-header 高度 -->
    <!-- pc端頭部 -->
    <header-vue class="h-header" />
    <!-- 二級路由出口 -->
    <main-vue class="h-main" />
    <!-- 右下角懸浮區域 -->
    <floating-vue />
  </div>
</template>
<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating/index.vue'
import {} from 'vue'
</script>