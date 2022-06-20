<template>
  <div>
    <Nav/>
    <main class="form-login">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Teste from './components/form/Teste.vue'
import UserInfo from './components/form/UserInfo.vue'
import Dono from './components/form/HomeOwner.vue'
import Home from './components/form/Home.vue'
import Header from './components/form/Header.vue'
import Login from './components/form/Form.vue'
import NavVue from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Teste,
    UserInfo,
    Dono,
    Home,
    Header,
    Login,
    NavVue
},
  data() {
    return { 
      owner: false,
      Login: true,
    }
  }
}
</script>