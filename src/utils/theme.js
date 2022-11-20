import store from '@/store'
import { watch } from 'vue'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM }  from '@/constants/index.js'

/** 監聽系統主題變更 */
let matchMedia
const watchSystemThemeChange = () => {
  // 一次初始化即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 監聽主題變更
  matchMedia.onchange = function() {
    changeTheme(THEME_SYSTEM)
  }
}
/**
 * 變更主題
 * ＠param {*} theme 主題的標記常量
 */
const changeTheme = (theme) => {
  // html 的 class
  let themeClassName = ''
  switch (theme) {
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_SYSTEM:
      // 調用方法，監聽系統主題變化
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  //  修改 html 的 class
  document.querySelector('html').className = themeClassName

}
/** 初始化主題 */
export default () => {
  // 1.當主題發生改變時，或者當進入系統時，可以進行 html class 的配置
  watch(
    () => store.getters.themeType,
    changeTheme,
    {
      // 初始執行一次
      immediate: true
    }
  )
}