import { createApp } from 'vue'
import router from './router/index.js'
import { useRem } from './utils/flexible.js'
import './style.css'
// 導入tailwind的基礎指令匯集檔
import './styles/index.scss'
import App from './App.vue'

useRem()
const app = createApp(App)
app.use(router).mount('#app')
