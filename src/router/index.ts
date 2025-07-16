import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/bar-chart',
      name: 'BarChart',
      component: () => import('@/views/BarChart.vue'),
    },
    {
      path: '/pie-chart',
      name: 'PieChart',
      component: () => import('@/views/PieChart.vue'),
    },
    {
      path: '/line-chart',
      name: 'LineChart',
      component: () => import('@/views/LineChart.vue'),
    },
    {
      path:'/table',
      name:'Table',
      component:()=>import('@/views/Table.vue')
    }
  ],
})

export default router
