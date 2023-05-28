import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/UploadView.vue')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('../views/RecordView.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('../views/InformationView.vue')
  },
  {
    path: '/uploaded',
    name: 'uploaded',
    component: () => import('../views/UploadedView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue')
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
