<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{
      height: containerHeight + 'px' // 因為當前為 relative 佈局，所以需要主動指定高度
    }"
  >
    <!-- 
      因為列數不確定，所以需要依據列數計算每列的寬度，
      所以等待列寬計算完成， 並且有了數據後才進行渲染
    -->
    <template v-if="columnWidth && data.length">
      <!-- 通過動態 style 計算對列列寬 left top -->
      <div
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left+ 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodekey] : index"
      >
        <slot :item="item" :index="index" :width="columnWidth"></slot>
      </div>
    </template>
    <div v-else>...Loading...</div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
const props = defineProps({
  // 數據源
  data: {
    type: Array,
    required: true
  },
  // 唯一標識的 key
  nodeKey: {
    type: String
  },
  // 列數
  column: {
    type: Number,
    default: 2
  },
  // 列間距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行間距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要進行圖片預讀取
  picturePreReading: {
    typeof: Boolean,
    default: true
  }
})

// ===== data  =====
// 容器總高度
const containerHeight = ref(0)
// 記錄每列高度容器的容器。key: 所在列 val: 列高
const columnHeightObj = ref({})
// 容器實例
const containerRef = ref(null)
// 容器總寬度（不包含 paddomg, margin, border
const containerWidth = ref(0)
// 容器左邊距，計算 item left 時，需要使用定位
const containerLeft = ref(0)
// 列寬
const columnWidth = ref(0)
// ===== computed =====
// 列間距合計
const columnSpacingTotal = computed(() => {
  // 如果是五列，則存在四個間距
  return (props.column - 1) * props.columnSpacing
})

// ===== methods =====
/** 建立紀錄各列的高度的對象 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for(let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
/** 計算容器寬度 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerRef.value, null)

  // 容器左邊距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器總寬度
  containerWidth.value = containerRef.value.offsetWidth -
                        parseFloat(paddingLeft) -
                        parseFloat(paddingRight)
}
/** 計算列寬度 */
const useColumnWidth = () => {
  // 計算容器寬度
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  // 計算列寬度
  useColumnWidth()
  console.log('計算列寬度: ', columnWidth.value)
})
</script>
<style lang="scss" scoped>
</style>