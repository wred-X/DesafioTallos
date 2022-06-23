import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../components/form/Login.vue';
import Register from '../components/form/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registro',
      name: 'registro',
      component: Register,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
