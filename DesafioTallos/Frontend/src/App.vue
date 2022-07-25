<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import axios from 'axios'

axios.interceptors.response.use(undefined, err => {
  return new Promise(function (resolve, reject) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
      this.$store.dispatch(AUTH_LOGOUT)
      // you can also redirect to /login if needed !
    }
    throw err;
  });
});
 
</script>

<template>
  <div >
    <div v-if="this.$store.state.status === ''" class="container-master">
      <RouterView />
    </div>
    <div v-else class="container-master">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  font-weight: normal;
}
.container-master{
  background-color: #f5f5f5;
}
</style>
