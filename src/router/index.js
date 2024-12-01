import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import EmptyList from '../views/EmptyList.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage
  },
  {
    path: '/empty-list',
    name: 'empty-list',
    component: EmptyList
  },
  {
    path: '/list',
    name: 'list',
    component: List
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
