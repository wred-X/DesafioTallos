<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <RouterView />
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
</style>
