<template>
  <div class="">
    <!-- 內容 -->
    <slot></slot>
    <div ref="loadingRef" class="h-6 py-4">
      <!-- 加載更多 -->
      <m-svg-icon
      v-show="loading"
      class="w-4 h-4 mx-auto animate-spin"
      name="infinite-load"
      ></m-svg-icon>
      <!-- 沒有更多數據 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">沒有更多數據</p>
    </div>
  </div>
</template>
<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  // 是否處於加載狀態
  modelValue: {
    type: Boolean,
    required: true
  },
  // 數據是否全部加載完成
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onLoad', 'update:modelValue'])
// 處理loading狀態
const loading = useVModel(props)
// 滾動元素
const loadingRef = ref(null) 

useIntersectionObserver(
  loadingRef,
  // isIntersecting: 當前元素是否可見
  ([{isIntersecting}], observerElement) => {
    if (isIntersecting && !loading.value && !props.isFinished) {
      // 修改加載數據標記
      loading.value = true
      // 觸發加載更多
      emits('onLoad`')
    }
  }  
)
</script>
<style lang="scss" scoped>

</style>