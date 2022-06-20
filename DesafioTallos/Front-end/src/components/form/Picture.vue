<template>
<!-- colocar ":" antes == v-bind -->
  <img :src="avatar" :alt="username">
</template>
<script>
export default {
  name: 'Picture',
  data() {
    return { 
      avatar: "../img/avatar.png",
      username: "Wesley Romão"
    }
  }
}
</script>