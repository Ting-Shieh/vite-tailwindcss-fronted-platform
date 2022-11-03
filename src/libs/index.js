/** 完成通用組件註冊 */
import SvgIcon from './SvgIcon/index.vue'
import PopUp from './PopUp/index.vue'
export default {
  install (app) {
    app.component('m-svg-icon', SvgIcon)
    app.component('m-popup', PopUp)
  }
}