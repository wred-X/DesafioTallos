<script>
import { RouterLink } from 'vue-router'
  export default {
    name: 'Header',
    data(){
      return {
        owner: this.$store.state.user.owner
      }
    },
    methods: {
        async submitLogOut () {
          await this.$store.dispatch('AUTH_LOGOUT')
          .then(() => {
          this.$router.push('/login')
        })
      },
      async submitEditUser(profile){
          try {
            localStorage.removeItem('findId')
            this.$router.push({
              name: 'edit',
            }).catch(() => {});
            return localStorage.setItem('findId', JSON.stringify(profile));
          } catch (error) {
             return console.log(error)
          }
     }
    },
  }
</script>

<template>
<header class="navbar navbar-bright navbar-fixed-top" role="banner">
  <div class="container" @submit.prevent>
    <nav class="collapse navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <ul class="home">
        <RouterLink style="margin-left: 25px; align-self: center; font-weight: bold; font-size: 18px;" to="/">Home</RouterLink>
        </ul>
        <ul class="perfil">
        <RouterLink style="align-self: center; font-size: 18px; font-weight: bold;" to="/meuPerfil">Perfil</RouterLink>
        </ul>
        <ul v-show="this.owner===true" class="edit">
        <RouterLink @click="submitEditUser(this.$store.state.user._id)" style="align-self: center; font-size: 18px; font-weight: bold;" to="/editar">Editar meu perfil</RouterLink>
        </ul>
        <ul v-show="this.owner===true" class="sign">
        <RouterLink style="align-self: center; font-size: 18px; font-weight: bold;" to="/registro">Registro</RouterLink>
        </ul>
        <div class="logout">
        <button @click="submitLogOut" style="width: 50px; align-self: center; font-size: 18px; font-weight: bold; margin-left: 13px; color: #eb196e; background-color: #f5f5f5; border-color: #a134f6;">Sair</button>
        </div>
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
  .logout{
    margin-left: auto
  }
  .edit{
    margin-top: 2px
  }
  .sign{
    margin-top: 2px
  }
  .perfil{
    margin-top: 2px
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
  	color: black;
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