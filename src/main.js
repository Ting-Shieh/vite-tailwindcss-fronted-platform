import { createApp } from 'vue'
import router from './router/index.js'
import store from './store/index.js'
import { useRem } from './utils/flexible.js'
import './style.css'
// 導入tailwind的基礎指令匯集檔
import './styles/index.scss'
// vite處理svg
import 'virtual:svg-icons-register'
// 導入通用組建註冊
import mLibs from './libs/index.js'
import App from './App.vue'

useRem()
const app = createApp(App)
app.use(mLibs).use(router).use(store).mount('#app')
