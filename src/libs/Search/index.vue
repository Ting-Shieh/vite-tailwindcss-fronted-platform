<template>
  <div ref="containerRef" class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
    <div class="">
      <!-- 搜尋圖標 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search" color="#707070"></m-svg-icon>
      <!-- 輸入框 -->
      <input
        placeholder="搜索"
        type="text"
        v-model="inputValue"
        @focus="onFocusHandler"
        @keyup.enter="onSearchHandler"
        @blur="onBlurHandler"
        class="block bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl w-full h-[44px] pl-4 text-sm dark:text-zinc-200 outline-0 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
      />
      <!-- 刪除按鈕 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割線 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜尋按鈕（通用組建） -->
      <m-button
        icon="search"
        iconColor="#fff"
        @click="onSearchHandler"
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full duration-500 group-hover:opacity-100"
      ></m-button>
    </div>
    <!-- 下拉區 -->
    <transition name="slider">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute left-0 top-[56px] p-2 rounded z-20 border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl"
      > 
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>
<script>
// 所有事件通知
const EMIT_UPDATE_MODELVALUE = 'update:modelValue' // 
const EMIT_SEARCH = 'search' // 觸發搜索（點擊或返回）事件
const EMIT_CLEAR = 'clear' // 刪除所有文本事件
const EMIT_INPUT = 'input' // 輸入事件
const EMIT_FOCUS = 'focus' // 獲取焦點事件
const EMIT_BLUR = 'blur' // 失去焦點事件
export default {}
</script>
<!-- 
  1. 輸入內容實現雙向數據綁定
  2. 搜尋按鈕在 hover 時展示
  3. 一鍵清空文本
  4. 觸發搜索
  5. 控制下拉展示區的展示
  6. 事件處理
 -->
<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

// emits
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

// data
const isFocus = ref(false)
const containerRef = ref(null)

// methods
/** 一鍵清空文本 */
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_SEARCH, '')
}
/** 觸發搜索 */
const onSearchHandler = () => {
  emits(EMIT_SEARCH, inputValue.value)
  // emits(EMIT_FOCUS)
}
/** 監聽焦點行為 */
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
/** 失去焦點 */
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}
// hooks
const inputValue = useVModel(props)
/** 點擊區域外隱藏 dropdown */
onClickOutside( containerRef, () => {
  isFocus.value = false
})

// watch
/** 監聽輸入行為 */
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
</script>
<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
.slider-enter-from,
.slider-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>