/** 完成通用組件註冊 */
import SvgIcon from './SvgIcon/index.vue'
export default {
  install (app) {
    app.component('m-svg-icon', SvgIcon)
  }
}