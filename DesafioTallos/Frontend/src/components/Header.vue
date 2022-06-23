<script>
import { RouterLink } from 'vue-router'
  export default {
    name: 'Header'
  }
</script>

<template>
<header class="navbar navbar-bright navbar-fixed-top" role="banner">
  <div class="container">
    <nav class="collapse navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <ul class="home">
        <RouterLink style="margin-left: 25px; align-self: center; font-weight: bold; font-size: 18px;" to="/">Home</RouterLink>
        </ul>
        <!-- <ul class="login">
        <RouterLink style="align-self: center; font-size: 18px; font-weight: bold;" to="/login">Login</RouterLink>
        </ul> -->
        <ul class="perfil">
        <RouterLink style="align-self: center; font-size: 18px; font-weight: bold;" to="/perfil">Perfil</RouterLink>
        </ul>
        <ul class="sign">
        <RouterLink style="align-self: center; font-size: 18px; font-weight: bold;" to="/registro">Registro</RouterLink>
        </ul>
      </ul>
    </nav>
  </div>
</header>
</template>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    margin-block-start: 0%;
    margin-block-end: 0%;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  nav {
    height: 55px;
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
  }
  .sign{
    margin-left: 80%;
  }
  a {
    color: #DDD;
    text-decoration: none;
    transition: .5s;
  }
  a:hover {
    color: rgb(0, 121, 10);
  }
  
  nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.navbar-bright {
	background-color:#fc03b1;
  margin: 0%;
  color:#fff;
}
  
.navbar-bright a, #masthead a, #masthead .lead {
  	color:#aaaacc;
}

.navbar-bright li > a:hover {
    background-color:#fc03b1;;
}

li {
    border-bottom:1px solid #a134f6;
}  

#sidebar li.active {
  	border-right:5px solid #a134f6;
}
</style>