<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{
      // 因為當前為 relative 佈局(裡面每一個元素都是脫離文檔流，導致relative高度無法計算)，
      // 所以需要主動指定高度
      height: containerHeight + 'px'
    }"
  >
    <!--
      [數據渲染]
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
        :key="nodeKey ? item[nodeKey] : index"
      >
        <!-- 作用域插槽 使用item做傳遞標誌 -->
        <slot :item="item" :index="index" :width="columnWidth"></slot>
      </div>
    </template>
    <!-- [加載中] -->
    <div v-else>...Loading...</div>
  </div>
</template>
<script setup>
import { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils.js'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
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
// item 高度集合
let itemHeights = []

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
// 列寬 = ( 容器的寬度 - 所有列間距寬度) / 列數
const columnWidth = ref(0)
// ===== computed =====
// 列間距合計
const columnSpacingTotal = computed(() => {
  // 如果是五列，則存在四個間距
  return (props.column - 1) * props.columnSpacing
})

// ===== methods =====
/**
 * 建立紀錄各列的高度的對象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for(let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
/**
 * 計算容器寬度
 */
const useContainerWidth = () => {
  console.log('getComputedStyle:', getComputedStyle(containerRef.value, null))
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
  // 列寬 = ( 容器的寬度 - 所有列間距寬度) / 列數
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}
/**
 * [需要圖片預加載]
 * 監聽圖片加載完成
 */
const waitImgComplete = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 獲取所有元素的 img 標籤圖片
  const imgElements = getImgElements(itemElements)
  // 獲取所有 img 標籤圖片
  const allImgs = getAllImg(imgElements)
  // 等待圖片加載完成
  onComplateImgs(allImgs).then(() => {
    // 圖片加載完成，獲取高度
    itemElements.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
  
}
/**
 * 返回下一個 item 的 Ｌeft
 */
const getItemLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    // 最小高度所在列 * (列寬度 ＋ 列間距) + 瀑布流左邊距 
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}
/**
 * 返回下一個 item 的 Top
 */
const getItemTop = () => {
  // 列高對象中的最小高度
  return getMinHeight(columnHeightObj.value)
}

/**
 * 指定列高自增
 * @param {*} index 
 */
const increasingHeight = (index) => {
  // 最小高度所在列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 該列高度自增 => 當前item 裡面的高度 + 行間距
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}
/**
 * 為每個 item 生成位置屬性
 */
const useItemLocation = () => {
  // console.log(itemHeights)
  // 遍歷數據源
  props.data.forEach((item, index) => {
    // 避免重複計算
    if (item._style) {
      return
    }
    // 生成 _style 屬性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
/**
 * 圖片不需要愈加載，計算 item 高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 計算 item 高度
  itemHeights.forEach(el => {
    // 依據傳入數據計算出的 img 高度
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
/**
 * 重新勾建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    // 重新計算列寬
    useColumnWidth()
    // 重置所有定位數據
    props.data.forEach(item => {
      item._style = null
    })
  }, 100)
}

// 觸發計算
watch(() => props.data, (nV) => {
  // 第一次獲取數據時，構建高度紀錄容器（重置數據源）
  const resetColumnHeight = nV.every(item => !item._style)
  if (resetColumnHeight) {
    // 重新構建高度紀錄容器
    useColumnHeightObj()
  }
  nextTick(() => {
    if (props.picturePreReading) {
      waitImgComplete()
    } else {
      useItemHeight()
    }
  })
},{
  immediate: true, // 一開始就先觸發一次
  deep: true // props data 是數組
})

/**
 * 監聽列數變化
 */
watch(() => props.column, () => {
  // [數據渲染]停止
  columnWidth.value = 0
  // 數據改變之後，視圖改變之後的回調
  // nextTick(() => {})
  reset()
})
// 元素渲染好後再行計算
onMounted(() => {
  // 計算列寬度
  useColumnWidth()
  console.log('計算列寬度: ', columnWidth.value)
})
/**
 * 組件銷毀時，清除所有的 _style
 */
onUnmounted(() => {
  props.data.forEach(item => {
    delete item._style
  })
})
</script>
<style lang="scss" scoped>
</style>