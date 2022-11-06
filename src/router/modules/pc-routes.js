// pc端路由
export default [
  {
    path: '/',
    name: 'main',
    componnent: () => import('@/views/layouts/index.vue'),
    children: []
  }
]