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
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('../views/WriteView.vue')
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: () => import('../views/ReadView.vue'),
      // props: true
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: '/'
    },
    {
      path: '/me',
      name: 'me',
      redirect: '/'
    }
  ]
})

export default router
