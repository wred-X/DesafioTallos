<template>
  <!-- <div v-if="owner">
    <Header /> 
    <Teste />
    <UserInfo />
    <Dono/>
  </div>
  <div v-else>
    <Teste />
    <UserInfo />
    <Home/>
  </div> -->
  <div v-if="Login">
    <Login />
  </div>
</template>

<script>
import Teste from './components/form/Teste.vue'
import UserInfo from './components/form/UserInfo.vue'
import Dono from './components/form/HomeOwner.vue'
import Home from './components/form/Home.vue'
import Header from './components/form/Header.vue'
import Login from './components/form/Form.vue'
export default {
  name: 'App',
  components: {
    Teste,
    UserInfo,
    Dono,
    Home,
    Header,
    Login
},
  data() {
    return { 
      owner: false,
      Login: true,
    }
  }
}
</script>