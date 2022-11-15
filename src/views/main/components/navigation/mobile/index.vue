<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul ref="ulRef" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 滑塊 -->
      <li ref="sliderRef" class="absolute bg-zinc-900 rounded-lg h-[22px] duration-200" :style="sliderStyle"></li>
      <!-- categoryItem class="last:mr-4" 指定最後一個距離右側的距離 -->
      <li
        :ref="setItemRef"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="setItemCls(index)"
        @click="onItemClick(index)"
        >
        {{ item.name }}
      </li>
      <!-- 漢堡按鈕 -->
      <li 
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
    </ul>
  </div>
  <m-popup v-model="isOpenPopup">
    <menu-vue @onItemClick="onItemClick"></menu-vue>
  </m-popup>
</template>
<script setup>
import MenuVue from '@/views/main/components/menu/index.vue'
import { computed, onBeforeUpdate, ref, watch } from 'vue';
import { useScroll } from '@vueuse/core'

// data
const ulRef = ref(null)
const isOpenPopup = ref(false)
const currentCategoryIndex = ref(0) // 選中 item 下標
/** 滑塊 */
const sliderStyle = ref({
  transform: `translateX(0px)`,
  width: '52px'
})

// beforeupdated 數據改變後，Dom變化前
onBeforeUpdate(() => {
  itemRefs = []
})

// hooks
const { x: ulScrollLeft } = useScroll(ulRef) // 獲取 ul, 以計算偏移位置

// computed
const setItemCls = computed(() => (index) => {
  return {
    'text-zinc-100': currentCategoryIndex.value === index
  }
})

// watch
watch(currentCategoryIndex, (nV) => {
  // 獲取選中元素的 left and width
  const { left, width }= itemRefs[nV].getBoundingClientRect()
  // 為 sliderStyle 設置屬性
  sliderStyle.value = {
    // ul 橫向滾動位置 + 當前元素的 left 偏移量
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})

// methods
const onItemClick = (index) => {
  currentCategoryIndex.value = index
  //
  isOpenPopup.value = false
}
/**
 * 獲取填充的所有 item 元素
 * @param {*} el 
 */
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

</script>
<style lang="scss" scoped>

</style>
