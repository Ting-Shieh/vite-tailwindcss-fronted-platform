import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileTerminalRoutes from './modules/mobile-routes.js'
import pcTerminalRoutes from './modules/pc-routes'
// 創建vueRouter實例
const router = createRouter({
    history: createWebHistory(),
    routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

export default router