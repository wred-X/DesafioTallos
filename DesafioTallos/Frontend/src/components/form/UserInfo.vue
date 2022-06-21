<template>
    <div>
      <p v-show="owner">Gerenciador de Funcionario</p>
      <Picture />
      <h1>{{ nome }}, {{age}} anos</h1>
      <h1>Função: {{work}}</h1>
      <div>
      <button v-show="owner" @click="showEdit">{{textEdit}}</button>
      </div>
    </div>
</template>

<script>
import Picture from './Picture.vue';
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
export default {
  name: 'UserInfo',
  components: {
    Picture,
},
  data() {
    return { 
      nome: "Ainda não sei",
      age: 20,
      work: "Dono",
      email: "teste@gmail.com",
      owner: true,
      editor: false,
      textEdit: "Abrir editor",
    }
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

<!-- <style>
  body {
    background-color: #008000; 
    color: #FFF;
  }
</style> -->