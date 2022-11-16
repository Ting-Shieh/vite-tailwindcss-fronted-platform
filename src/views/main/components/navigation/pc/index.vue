<template>
    <div class="bg-white sticky top-0 left-0 w-full z-10">
      <ul
        :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
        class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      >
        <!-- lg 下展開箭頭 -->
        <div
          @click="triggerState"
          class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
        >
          <m-svg-icon class="w-1 h-1" :name="isOpenCategory ? 'fold' : 'unfold'" fillClass="fill-zinc-900"></m-svg-icon>
        </div>
        <!-- category item -->
        <li 
          v-for="(item, index) in $store.getters.categorys"
          :key="item.id"
          class="shrink-0 px-1 5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
          :class="{
            'text-zinc-900 bg-zinc-200' : currentCategoryIndex === index
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