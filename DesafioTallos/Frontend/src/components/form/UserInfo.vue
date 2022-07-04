<template>
    <div class="container">
      <div class="profile">
      <Picture />
      <h1 class="myName">{{$store.state.user.name}}, {{$store.state.user.age}} anos</h1>
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
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
export default {
  name: 'UserInfo',
  components: {
    Picture,
    Logo
},
  data() {
    return { 
      image: "/Frontend/../img/login.png",
      name: null,
      age: 20,
      work: "Dono",
      email: "teste@gmail.com",
      owner: true,
      editor: false,
      textEdit: "Abrir editor",
    }
  },
  setup () {
    const store = useStore()
  },
  created() {
    this.nome = "Wesley Romão"
  },
  methods: {
    showEdit() {
      this.edit = !this.edit
      if(!this.edit) {
        this.textEdit = "Editar funcionario"
      } else {
        console.log("editor aberto")
        this.textEdit = "Concluir edição"
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
