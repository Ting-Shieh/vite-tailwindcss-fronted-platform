<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定義 h-header 高度 -->
    <!-- pc端頭部 -->
    <header-vue class="h-header"></header-vue>
    <!-- 二級路由出口 -->
    <div class="h-main">
      <main-vue />
    </div>
    <!-- 右下角懸浮區域 -->
    <floating-vue class=""/>
  </div>
</template>
<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating/index.vue'
import {} from 'vue'
</script>