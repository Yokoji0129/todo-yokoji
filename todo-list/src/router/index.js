import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '../views/TodayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'today',
      component: TodayView
    },
    {
      path: '/important',
      name: 'important',
      component: () => import('../views/ImportantView.vue')
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue')
    },
  ]
})

export default router
