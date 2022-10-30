import { createApp } from 'vue'
import router from './router'
import './style.css'
// 導入tailwind的基礎指令會及檔
import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router).mount('#app')
