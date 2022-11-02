<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 滑塊 -->
      <li ref="sliderRef" class="this absolute bg-zinc-900 rounded-lg h-[22px] duration-200" :style="sliderStyle"></li>
      <!-- categoryItem class="last:mr-4" 指定最後一個距離右側的距離 -->
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4">
        {{ item.name }}
      </li>
      <!-- 漢堡按鈕 -->
      <li class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  data: {
    type: Array,
    required: true
  }
})
// 滑塊
const sliderStyle = ref({
  transform: `translateX(0px)`,
  width: '60px'
})
</script>
<style lang="scss" scoped>

</style>