import { createApp } from 'vue';
import { store } from './store';

import App from './App.vue';
import router from './router';
import '../node_modules/nprogress/nprogress.css';
import VueSweetalert2 from 'sweetalert2';
import '../node_modules/sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from 'vuelidate';
import './assets/tailwind.css';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(
  router,
  VueSweetalert2,
  Vuelidate,
  BootstrapVue,
  IconsPlugin,
);

app.mount('#app');
