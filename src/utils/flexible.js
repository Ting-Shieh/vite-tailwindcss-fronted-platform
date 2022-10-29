/**
 * 判斷當前設備是移動端還是pc端
 */
import { computed } from "vue";
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
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