<template>
    <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
      <ul
        :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
        class="w-[800px] relative flex flex-wrap justify-center
        overflow-x-auto px-[10px] py-1 text-xs text-zinc-600
        duration-300 overflow-hidden mx-auto"
      >
        <!-- lg 下展開箭頭 -->
        <div
          @click="triggerState"
          class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        >
          <m-svg-icon
            class="w-1 h-1"
            :name="isOpenCategory ? 'fold' : 'unfold'"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
        </div>
        <!-- category item -->
        <li 
          v-for="(item, index) in $store.getters.categorys"
          :key="item.id"
          class="shrink-0 px-1 5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-500
          dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer
          hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
          :class="{
            'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900' :
            currentCategoryIndex === index
          }"
          @click="onItemClick(index)"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'
// data
const isOpenCategory = ref(false)
const currentCategoryIndex = ref(0) // 選中狀態處理

// methods
/** 展開狀態切換處理 */
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}
/** 選中狀態處理 */
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>
<style lang="scss" scoped>

</style>
/** 
 * 遇到問題
 * 1. navigationBar 閃爍問題
 * => 初始時只有“全部“，之後加載才會顯示所有api過來數據
 */