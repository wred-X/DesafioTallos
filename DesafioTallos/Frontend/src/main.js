import { createApp } from 'vue';
import { store } from './store';

import App from './App.vue';
import router from './router';
import '../node_modules/nprogress/nprogress.css';
import VueSweetalert2 from 'sweetalert2';
import Vuelidate from 'vuelidate';
// library.add(faUserPlus, faUserEdit, faTrash);

const app = createApp(App);

// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router, VueSweetalert2, Vuelidate);

app.mount('#app');
