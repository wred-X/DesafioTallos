import { createRouter, createWebHistory } from 'vue-router';
import Nprogress from 'nprogress';
import HomeView from '../views/HomeView.vue';
import Login from '../components/form/Login.vue';
import Register from '../components/form/Register.vue';
import Edit from '../components/form/Edit.vue';
import MyProfile from '../components/MyProfile.vue';
import Chat from '../socketChat/Chat.vue';
import MyPicture from '../components/MyPicture.vue';
import Welcome from '../components/Welcome.vue';
import { store } from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  } else {
    next('/login');
  }
};

const ifOwner = (to, from, next) => {
  if (store.getters.isOwner) {
    next();
    return;
  } else {
    next('/');
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/registro',
      name: 'registro',
      component: Register,
      beforeEnter: ifAuthenticated && ifOwner,
    },
    {
      path: '/editor',
      name: 'edit',
      component: Edit,
      beforeEnter: ifAuthenticated && ifOwner,
    },
    {
      path: '/meuPerfil',
      name: 'meuPerfil',
      component: MyProfile,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/picture',
      name: 'myPicture',
      component: MyPicture,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
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
