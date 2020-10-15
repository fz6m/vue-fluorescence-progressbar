import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/example',
    name: 'Example',
    // Only pages that load components asynchronously
    // The loading effect can be obtained at the first visit
    component: () => import(/* webpackChunkName: "example" */ '../views/Example.vue')
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Pages loaded asynchronously when to.matched[0]?.components.default is function
  if (typeof to.matched[0]?.components.default === 'function') {
    store.dispatch('progressbar/start')
  }
  next()
})

router.beforeResolve((to, from, next) => {
  store.dispatch('progressbar/stop')
  next()
})

export default router
