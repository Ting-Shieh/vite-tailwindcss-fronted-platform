/** 完成通用組件“自動"註冊 */
// import SvgIcon from './SvgIcon/index.vue'
// import Popup from './Popup/index.vue'
import { defineAsyncComponent } from 'vue'
function isCapital(str){
  let reg = /^[A-Z]+$/
  return reg.test(str)
}
// https://blog.51cto.com/u_15302032/3065688
function uncamelize(str, separator='-') {
  let temp = str.replace(/[A-Z]/g, (match) => {
    return separator + match.toLowerCase()
  })
  if(temp.slice(0,1) === separator){
    temp = temp.slice(1)
  }
  return temp
}
export default {
  install (app) {
    // // old: 非自動註冊
    // app.component('m-svg-icon', SvgIcon)
    // app.component('m-popup', Popup)
    // new: 自動註冊
    // 1. 獲取當前路徑任意文件夾下的 index.vue 文件
    const components = import.meta.glob('./*/index.vue')
    // 2. 遍歷獲取到的組件模塊
    for (const [fullpath, fn] of Object.entries(components)) {
      // console.log(fullpath, '--', fn)
      // 拼接組建註冊的 name
      const tempName = fullpath.replace('./', '').split('/')[0]
      // console.log(uncamelize(tempName))
      const componentName = 'm-' + uncamelize(tempName)
      // 通過 defineAsyncComponent 異步導入指定路徑下的組件
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}