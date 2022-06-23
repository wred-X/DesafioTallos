<template>
<!-- colocar ":" antes == v-bind -->
  <div class="container_logo">
  <img :src="logo" class="card__logo">
  </div>
</template>
<script>
export default {
  name: 'Logo',
  data() {
    return { 
      logo: "/img/login.png",
      
    }
  }
}
</script>

<style>
.card__logo {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>