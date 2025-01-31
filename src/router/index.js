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
    },
    {
      path: '/slide-extend-list',
      name: 'slide-extend-list',

      component: () => import('../views/SlideExtendList.vue')
    
    },
    {
      path: '/ui-select-box',
      name: 'ui-select-box',

      component: () => import('../views/UISelectBox.vue')
    
    },
    {
      path: '/fire-cracker',
      name: 'fire-cracker',

      component: () => import('../views/FireCracker.vue')
    
    },
    {
      path: '/side-nav-layout',
      name: 'side-nav-layout',

      component: () => import('../views/SideNavView.vue')
    
    },
    {
      path: '/grid-system',
      name: 'grid-system',

      component: () => import('../views/GridSystem.vue')
    
    },
    {
      path: '/grid-system2',
      name: 'grid-system2',

      component: () => import('../views/GridSystem2.vue')
    
    },
    {
      path: '/snackbar',
      name: 'snackbar',

      component: () => import('../views/SnackbarView.vue')
    
    },
    {
      path: '/new-style',
      name: 'new-style',

      component: () => import('../views/NewStyle.vue')
    
    },
    {
      path: '/scroll-timeline',
      name: 'scroll-timeline',

      component: () => import('../views/ScrollTimeline.vue')
    
    },
    {
      path: '/sub-grid',
      name: 'sub-grid',

      component: () => import('../views/SubGrid.vue')
    
    },
    {
      path: '/ui-table',
      name: 'ui-table',

      component: () => import('../views/UiTable.vue')
    
    }
  ]
})
export default router
