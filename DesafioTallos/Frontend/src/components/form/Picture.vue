<template>
<!-- colocar ":" antes == v-bind -->
  <div style="padding-left: 20px;">
  <img :src="avatar" :alt="username" class="card__image">
  </div>
</template>
<script>
export default {
  name: 'Picture',
  data() {
    return { 
      avatar: "/img/avatar.png",
      username: "Wesley Romão"
    }
  }
}
</script>

<style>
.card__image {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 3px solid #fc03b1;
  margin-top: 20px;
}
</style>