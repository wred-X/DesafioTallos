import { createApp } from 'vue';
import { store } from './store';

import App from './App.vue';
import router from './router';
import '../node_modules/nprogress/nprogress.css';
import VueSweetalert2 from 'sweetalert2';
import Vuelidate from 'vuelidate';
import './assets/tailwind.css';

const app = createApp(App);
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}
// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router, VueSweetalert2, Vuelidate);

app.mount('#app');
