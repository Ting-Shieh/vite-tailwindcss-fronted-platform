<template>
  <div class="">
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <!-- old: 不可以在子組件直接修改響應式數據 -->
        <!-- <div
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
          class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0"></div> -->
        <!-- new: -->
        <div
          v-if="isOpen"
          @click="isOpen = false"
          class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0"></div>
      </transition>
      <!-- 內容 -->
      <transition name="popup-down-up">
        <!-- old: 不可以在子組件直接修改響應式數據 -->
        <!-- <div v-if="modelValue" v-bind="$attrs" class="w-screen bg-white z-50 fixed bottom-0">
          <slot />
        </div> -->
        <!--  -->
        <div v-if="isOpen" v-bind="$attrs" class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { useScrollLock, useVModel } from '@vueuse/core';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
// // old: 不需要主动触发了
// const emits = defineEmits(['update:modelValue'])
// new => 通過 useVModel 獲取到響應式數據 isOpen，當isOpen改變時，會自動觸發 update:modelValue
const isOpen = useVModel(props)
// 滾動鎖定
const isLocked = useScrollLock(document.body)
watch(
  // () => props.modelValue,
  isOpen,
  (nV) => {
  isLocked.value = nV
},{
  immediate: true
})
</script>
<style lang="scss" scoped>
// fade 展示動畫
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// popup-down-up 展示動畫
.popup-down-up-enter-active {
  transition: all 0.3s;
}
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>