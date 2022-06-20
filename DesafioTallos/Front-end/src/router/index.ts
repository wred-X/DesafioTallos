import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/components/form/Login.vue';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
