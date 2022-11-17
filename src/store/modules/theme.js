import { THEME_LIGHT } from '@/constants/index.js'

export default {
  namespaced: true,
  state: () => ({
    // 主題模式
    themeType: THEME_LIGHT
  }),
  mutations: {
    /** 切換主題模式 */
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}