<template>
  <form class="container-register" @submit.prevent="handleSubmitForm()">
    <div class="title-container">
      <h1 class="title">Casdastro de funcionarios!</h1>
    </div>
    <div class="input-container">
      <label for="name">Nome do funcionario:</label>
      <input 
        v-model="user.name" 
        :class="{'is-invalid': isSubmitted && $v.user.name.$errors}" 
        class="form-control" 
        placeholder="Nome" 
        required
      >
      <div v-if="isSubmitted && $v.user.name.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="email">Coloque seu melhor Email:</label>
      <input v-model="user.email" :class="{'is-invalid': isSubmitted && $v.user.email.$errors}" type="email" class="form-control" placeholder="Email" required>
      <div v-if="isSubmitted && $v.user.email.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="password">Senha para acesso:</label>
      <input v-model="user.password" :class="{'is-invalid': isSubmitted && $v.user.password.$errors}" type="password" class="form-control" placeholder="Senha" required>
      <div v-if="isSubmitted && $v.user.password.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="work">Em que área ele irá atuar ?</label>
      <input v-model="user.work" :class="{'is-invalid': isSubmitted && $v.user.work.$errors}" class="form-control" placeholder="Função" required>
      <div v-if="isSubmitted && $v.user.work.$required" class="invalid-feedback"></div>
    </div>
    <div class="select-container">
      <div class="select" style="padding-right: 24px;">
        <label for="age" style="padding-left: 2px;">Idade:</label>
        <input placeholder="XX" v-model="user.age" :class="{'is-invalid': isSubmitted && $v.user.age.$errors}" style="width: 40px;" name="age" id="age" required>
      </div>
      <div class="select">
        <label for="permission">Permissão</label>
        <select required name="permission" id="permission" v-model="user.permission" :class="{'is-invalid': isSubmitted && $v.user.permission.$errors}">
          <option :value="null" disabled>Escolha</option>
          <option :value="false">Comum</option>
          <option :value="true">Admin</option>
        </select>
      </div>
      <!-- <div v-if="isSubmitted && $v.user.permission.$required" class="invalid-feedback"></div>       -->
    </div>
    <div class="input-container">
          <input @click="showAlert" class="submit-btn" type="submit" value="Cadastrar!">
              <!-- <font-awesome-icon :icon="['fas', 'user-plus']" /> -->
    </div> 
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, between } from '@vuelidate/validators'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2';
import TaskService from '../../services/TaskService';
import axios from "axios";
import Api from '../../services/Api';

const socket = io('http://localhost:3000')

export default {
  name: "Register",
  setup: () => ({ v$: useVuelidate() }),
  data(){
    return {
      user: {
        email: null,
        password: null,
        name: null,
        age: null,
        work: null,
        permission: null
    },
    task:[],
    isSubmitted: false,
  }
  },
  validations(){
    return {
      user: {
       email: {required},
       password: {required},
       name: {required},
       age: {required, between: between(18, 99)},
       work: {required},
       permission: {required},
    }}
  },
   methods: {
     handleSubmitForm() {
        this.isSubmitted = true;
     },
     async showAlert() {
      // Use sweetalert2
      const result = await this.v$.$validate()
      if (result) {
      this.submitNewUser()
      Swal.fire({
        title:'Registro completo!',
        text:'Um funcionario foi adicionado!',
        icon:'success',
        confirmButtonColor: '#00ff7f'      
        }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({
          name: 'home',
        }).catch(() => {});;
          
        }
      })
      }
    },
    async submitNewUser(){
      try {
        const response = await axios.post('http://localhost:3000/tasks/', this.user);
        socket.emit('newUsers', {task: response}, (response) => {
        this.$store.dispatch('SOCKET_new', response)
        });
        return true;
      } catch (error) {
          return console.log(error)
        }
      }
   }
}
</script>

<style scoped>
.container-register{
  background-color: #f5f5f5;
  height: 91vh;
}
.title-container{
  padding-top: 3%;
  padding-bottom: 0.8%;
  display:flex;
  align-items: center;
  flex-direction: column;
}
.input-container {
    display:flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
  label {
    margin-top: 0.2%;
    margin-bottom: 0.5%;
    font-weight: bold;
    color: #222;;
    padding: 5px 10px;
  }
  input{
    padding: 5px 10px;
    width: 300px;
    align-self: center;
  }
  .select-container{
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 20px;
  }
  
 select {
    padding: 5px 10px;
    width: 90px;
    align-self: center;
  }
  .submit-btn {
    background-color: #222;
    color:#ffbdd6;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    align-self: center;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #ffbdd6;
  }
</style>