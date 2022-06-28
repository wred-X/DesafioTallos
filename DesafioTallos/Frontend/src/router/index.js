import { createRouter, createWebHistory } from 'vue-router';
import Nprogress from 'nprogress';
import HomeView from '../views/HomeView.vue';
import Login from '../components/form/Login.vue';
import Register from '../components/form/Register.vue';
import Edit from '../components/form/Edit.vue';
import MyProfile from '../components/MyProfile.vue';

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
      path: '/editor',
      name: 'editor',
      component: Edit,
    },
    {
      path: '/meuPerfil',
      name: 'meuPerfil',
      component: MyProfile,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    Nprogress.start();
  }
  next();
});

router.afterEach((to, from) => {
  Nprogress.done();
});

export default router;
