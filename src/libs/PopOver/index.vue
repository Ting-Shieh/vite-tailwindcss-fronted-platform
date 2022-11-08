<template>
  <div
    class="relative"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseenter"
  >
    <div>
      <!-- 具名插槽 -->
      <slot name="reference"></slot>
    </div>
    <!-- 氣泡展示動畫 -->
    <transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-l z-20 bg-white border rounded-md"
      >
        <!-- 匿名插槽 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script setup>
import {} from 'vue'
// 控制 menu 展示
const isVisable = ref(false)

// methods
/** 鼠標移出的觸發行為 */
const onMouseleave = () => {
  isVisable.value = false
}
/** 鼠標移入的觸發行為 */
const onMouseenter = () => {
  isVisable.value = true
}
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>