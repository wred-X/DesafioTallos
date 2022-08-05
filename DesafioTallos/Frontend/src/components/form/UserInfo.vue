<template>
    <div class="container">
      <div class="profile" style="width: 225px;">
      <Picture />
      <h1 class="myName">{{profile.name}}, {{profile.age}} anos</h1>
      </div>
      <div style="align-self:center;">
        <h1>Bem vindo ao nosso sistema!</h1>
        <!-- <h1>Função: {{work}}</h1> -->
      </div>
      <Logo />
    </div>
</template>

<script>
import Picture from './Picture.vue';
import Logo from '../Logo.vue';
import axios from 'axios';

export default {
  name: 'UserInfo',
  components: {
    Picture,
    Logo
  },
  data() {
    return { 
      image: "/Frontend/../img/login.png",
      profile: {
        name: null,
        age: null,
      }
    }
  },
  mounted() {
    this.getById(this.$store.state.user.id);
  },
  methods: {
    async getById(id){
      const response = await axios.get(`http://localhost:3000/tasks/${id}`)
      if(response.status == 200){
        return this.profile = response.data
      }else{
         console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.container{
  justify-content: space-between;
  display: flex;
  background-color: #a134f6;
}
.img{
    align-self: flex-end;
    object-fit: cover;
    max-width: 15%;
    height: auto;
  }
.profile{
  margin-bottom: 2%;
  margin-left: 1%;
  align-self: center;
}
.container_logo{
    width: 240px;
}
.myName{
  font-size: 18px;
  font-family: 'Baloo Paaji 2', cursive;
}
</style>
