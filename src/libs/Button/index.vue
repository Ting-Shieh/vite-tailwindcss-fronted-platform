<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEum[type],
      sizeEum[sizeKey].button,
      {'active:scale-105': isActiveAnim}
    ]"
    @click.stop="onBtnClick"
  >
  <!-- 展示 loading -->
  <m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>
  <!-- icon 按鈕 -->
  <m-svg-icon
    v-if="icon"
    :name="icon"
    class="m-auto"
    :class="sizeEum[sizeKey].icon"
    :color="iconColor"
    :fillClass="iconClass"
  ></m-svg-icon>
  <!-- 文字按鈕 -->
  <slot v-else />
  </button>
</template>
<script setup>
import { computed, defineEmits } from 'vue';

// type 可選項：表示按鈕風格
const typeEum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 ',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main ',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 '
}
// size 可選項：表示按鈕大小。區分文字按鈕和icon按鈕
const sizeEum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-8 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-7 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

/** props 讓開發者可以控制當前按鈕 */
const props = defineProps({
  // icon 圖標名字
  icon: {
    type: String
  },
  // icon 圖標顏色
  iconColor: {
    type: String
  },
  // icon 圖標類名（匹配 tailwind)
  iconClass: {
    type: String
  },
  // 按鈕風格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 獲取所有的可選的按鈕風格
      const keys = Object.keys(typeEum)
      // 開發者指定風格是否在可選風格中
      const result = keys.includes(val)
      // 如果不在則開發者提示
      if (!result) {
        throw new Error(`你的 type 必須是 ${keys.join('，')} 中的一個`)
      }
      // 返回驗證結果
      return result
    }
  },
  // 大小風格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 獲取所有的可選的大小（注意剔除 icon 開頭的元素，因為我們期待開發者輸入 size="default"，但不期望開發者輸入 size="icon-default")
      const keys = Oject.keys(sizeEum).filter((key) => !key.includes('icon'))
      // 開發者指定大小是否在可選大小中
      const result = keys.includes(val)
      // 如果不在則開發者提示
      if (!result) {
        throw new Error(`你的 size 必須是 keys.join('，') 中的一個`)
      }
      // 返回驗證結果
      return result
    }
  },
  // 按鈕在點擊時是否需要動畫
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加載狀態
  loading: {
    type: Boolean,
    default: false
  }
})

// computed
const sizeKey = computed(() => props.icon ? 'icon-' + props.size : props.size) // 處理大小的 key 值

// emits
const EMITS_CLICK = 'click'
const emits = defineEmits([EMITS_CLICK])

// methods
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits('EMITS_CLICK')
}
</script>
<style lang="scss" scoped>

</style>