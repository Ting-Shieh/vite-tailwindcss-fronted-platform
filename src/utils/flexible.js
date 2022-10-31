
import { computed } from "vue";
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

/**
 * 初始化 rem 基準值，最大為 40 px
 */
export const useRem = () => {
  // 定義最大的fontSize
  const MAX_FONT_SIZE = 40
  // 監聽 html 文檔被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 獲取 html 標籤
    const html = document.querySelector('html')
    // 獲取根元素 fontSize 標準，螢幕寬度 / 10。（以 Iphone 為例 Iphone 6 螢幕寬度為 375，則標準 fontSize 為 37.5）
    let fontSize = window.innerWidth / 10
    // 獲取到的 fontSize 不允許超過我们定義的最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 定義根元素（html）fontSize 的大小 （rem)
    html.style.fontSize = fontSize + 'px'
  })
}
/**
 * 判斷當前設備是移動端還是pc端
 */
 const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
    // 響應式視圖處理
    // return document.documentElement.clientWidth < PC_DEVICE_WIDTH // 非響應式
    return width.value < PC_DEVICE_WIDTH
    // // 實際開發“是否為移動端”以下面方式為主
    // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    // )
})