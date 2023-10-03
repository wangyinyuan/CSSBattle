import Battles from '@/views/Battles/BattlesView.vue'
import Daily from '@/views/DailyTargets/DailyTargets.vue'
import Home from '@/views/Home/HomeView.vue'
import Layout from '@/views/Layout/IndexView.vue'
import NotFound from '@/views/NotFound/NotFounded.vue'
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
  },
  {
    path: '/play',
    component: () => import('@/views/Play/PlayView.vue'),
    meta: { title: 'Play | CSSBattle' },
    name: 'play'
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { title: '404 NotFounded' },
    name: 'not-found'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title as string
  if (pageTitle) {
    document.title = pageTitle
  } else {
    document.title = 'CSSBattle'
  }
  next()
})

export default router
