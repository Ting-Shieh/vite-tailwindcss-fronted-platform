<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 顯示 svg 圖標名稱(剔除 icon)
  name: {
    type: String,
    required: true
  },
  // 直接指定 svg 圖標的顏色
  color: {
    type: String
  },
  // 通過 tailwind 指定 svg 顏色類名
  fillClass: {
    type: String
  }
})
// 真實顯示的 svg 圖標 （拼接 ＃icon-）
const symbolId = computed(() => `#icon-${props.name}`)
</script>