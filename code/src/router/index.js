import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
