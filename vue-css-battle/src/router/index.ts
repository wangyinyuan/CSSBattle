import Battles from '@/views/Battles/BattlesView.vue'
import Daily from '@/views/DailyTargets/DailyTargets.vue'
import Home from '@/views/Home/HomeView.vue'
import Layout from '@/views/Layout/IndexView.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        meta: { title: 'CSSBattle' }
      },
      {
        path: 'daily',
        component: Daily,
        meta: { title: 'Daily Targets | CSSBattle' }
      },
      {
        path: 'battles',
        component: Battles,
        meta: { title: 'Battles | CSSBattle' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
