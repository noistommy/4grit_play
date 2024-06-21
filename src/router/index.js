import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/font',
      name: 'font-test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FontTest.vue')
    },
    {
      path: '/draw',
      name: 'svg-draw',
    
      component: () => import('../views/SVGDraw.vue')
    },
    {
      path: '/flexible',
      name: 'flexible-view',
    
      component: () => import('../views/FlexibleView.vue')
    },
    {
      path: '/ui-switch',
      name: 'ui-switch',
    
      component: () => import('../views/UISwitch.vue')
    },
    {
      path: '/ui-pagination',
      name: 'ui-pagination',
    
      component: () => import('../views/UIPagination.vue')
    }
  ]
})

export default router
