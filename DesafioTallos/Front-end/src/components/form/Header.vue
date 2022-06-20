<template>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Informativos</a></li>
    <li><a href="#">Contato</a></li>
  </ul>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>
  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 30px;
  }
  a {
    color: #DDD;
    text-decoration: none;
    transition: .5s;
  }
  a:hover {
    color: rgb(0, 121, 10);
  }
</style>