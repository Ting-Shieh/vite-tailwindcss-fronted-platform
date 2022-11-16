// pc端路由
export default [
  {
    path: '/',
    name: 'main',
    // 存在二級路由出口
    component: () => import('@/views/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
  }
]