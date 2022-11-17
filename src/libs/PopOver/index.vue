<template>
  <div
    ref="referenceRef"
    class="relative"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseenter"
  >
    <div>
      <!-- 具名插槽: 觸發彈層的視圖 -->
      <slot name="reference"></slot>
    </div>
    <!-- 氣泡展示動畫 -->
    <transition name="slide">
      <div
        ref="contentRef"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽：彈出層視圖中展示的內容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
// 控制氣泡彈出的位置，應該有4個可控展示：
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-left'
// 定義指定位置 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
// 延遲關閉時長
const DELAY_TIME = 200
export default {}
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 控制氣泡彈出位置，給開發者錯誤提示
  placement: {
    type: String,
    default: 'bottom-left',
    validator (val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error (`你的 placement 必須是 ${placementEnum.join('、')} 中的一個`)
      }
      return result
    }
  }
})
// 控制 menu 展示
const isVisable = ref(false)
const referenceRef = ref(null)
const contentRef = ref(null)
/** 計算彈層位置 */
const contentStyle = ref({
  top: 0,
  left: 0
})

// watch
/** 監聽展示變化，在展示時計算位置 */
watch(isVisable, (nV) => {
  if (!nV) {
    return
  }
  // 等待渲染成功後
  // [ vue 在數據改變後，需等待一段時間 Dom 才會變化，
  //  所以我們可以通過 nextTick 函數的參數，來監聽Dom變化之後的回調．]
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentRef.value) + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceRef.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceRef.value).height + 'px' 
        contentStyle.value.left = -useElementSize(contentRef.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceRef.value).height + 'px' 
        contentStyle.value.left = useElementSize(referenceRef.value).width + 'px'
        break
    }
  })
})
// methods
/** 獲取元素Dom，計算元素尺寸 */
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
/**
 * TODO: 處理慢速移動時，氣泡消失問題
 * 因在 reference 與 氣泡之間存在間隔，
 * 當鼠標移動到這個間隔處時，就會觸發 mouseleave 鼠標移出事件，
 * 那此時 isVisable 就會變成 false。
 * [處理方式]
 * 鼠標剛離開時，不去立刻修改 isVisable，
 * 而是延遲一段時間，如果在這段時間內，再次觸發了鼠標移入事件，則不再修改 isViable
 */
// 控制延遲關閉
let timeout = null
/** 鼠標移出的觸發行為 */
const onMouseleave = () => {
  // 延時裝置
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}
/** 鼠標移入的觸發行為 */
const onMouseenter = () => {
  isVisable.value = true
  // 再次觸發時，清理延時裝置
  if (timeout) {
    clearTimeout(timeout)
  }
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