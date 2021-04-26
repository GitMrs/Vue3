import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';
import Detail from '../views/detail.vue';
import Look from '../views/look.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Layout,
      redirect: '/home/book',
      children: [
        {
          path: 'book',
          component: () => import('../views/book.vue')
        },
        {
          path: 'update',
          component: () => import('../views/update.vue')
        }
      ]
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/look/:width',
      component: Look
    }
  ]
})
export default router;