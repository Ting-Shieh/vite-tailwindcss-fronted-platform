import store from '@/store'
import { watch } from 'vue'
import { THEME_DARK, THEME_LIGHT }  from '@/constants/index.js'
export default () => {
  watch(
    () => store.getters.themeType,
    (nV) => {
      // html 的 class
      let themeClassName = ''
      switch (nV) {
        case THEME_DARK:
          themeClassName = 'dark'
          break
        case THEME_LIGHT:
          themeClassName = 'light'
          break
      }
      // 修改 html 的 class
      document.querySelector('html').className = themeClassName
    },
    {
      // 初始執行一次
      immediate: true
    }
  )
}