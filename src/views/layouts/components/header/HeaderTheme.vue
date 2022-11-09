<template>
  <m-popover class="">
    <template #reference>
      <m-svg-icon
        name="theme-light"
        fillClass="fill-zinc-900"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in themeArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>
<script setup>
import { THEME_SYSTEM, THEME_LIGHT, THEME_DARK } from '@/constant/index.js'
import {} from 'vue'
// 建構渲染數據源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '極簡白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '極簡黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟隨系統'
  }
]
</script>
<style lang="scss" scoped>
</style>