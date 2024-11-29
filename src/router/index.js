import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import Loading from '../views/Loading.vue'
import EmptyList from '../views/EmptyList.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage
  },
  {
    path: '/loading',
    name: 'loading',
    component: Loading
  },
  {
    path: '/empty-list',
    name: 'empty-list',
    component: EmptyList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
