// pc端路由
export default [
  {
    path: '/',
    name: 'main',
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