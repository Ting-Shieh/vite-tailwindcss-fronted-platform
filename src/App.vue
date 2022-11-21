<script setup>
import { isMobileTerminal } from './utils/flexible.js'
</script>

<template>
  <!-- 一級路由出口 -->
  <div class="h-screen w-   screen fixed top-0 left-0">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.this {
  border: 1px solid red;
}
</style>
