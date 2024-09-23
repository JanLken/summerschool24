import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import WhgAnm from '../views/Whg_anm.vue';
import ServiceView from '../views/ServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:categoryId',
      name: 'category',
      component: CategoryView,
      props: true,
    },
    {
      path: '/Whg_anm/:serviceId',
      name: 'whgAnm',
      component: WhgAnm,
      props: true    },
    {
      path: '/service/:serviceId',
      name: 'service',
      component: ServiceView,
      props: true
    }
  ]
})

export default router
