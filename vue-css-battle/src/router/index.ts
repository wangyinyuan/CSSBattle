import Battles from '@/views/Battles/BattlesView.vue'
import Daily from '@/views/DailyTargets/DailyTargets.vue'
import Home from '@/views/Home/HomeView.vue'
import Layout from '@/views/Layout/IndexView.vue'

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
