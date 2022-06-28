import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import '../node_modules/nprogress/nprogress.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import {
//   faUserPlus,
//   faUserEdit,
//   faTrash,
// } from '@fortawesome/free-solid-svg-icons';
import VueSweetalert2 from 'sweetalert2';
import Vuelidate from 'vuelidate';

// library.add(faUserPlus, faUserEdit, faTrash);

const app = createApp(App);

// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router, VueSweetalert2, Vuelidate);

app.mount('#app');
