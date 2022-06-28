<template>
  <form class="container-register" @submit.prevent="handleSubmitForm()">
    <div class="title-container">
      <h1 class="title">Casdastro de funcionarios!</h1>
    </div>
    <div class="input-container">
      <label for="name">Nome do funcionario:</label>
      <input 
        v-model="user.name" 
        :class="{'is-invalid': isSubmitted && $v.user.name.$error}" 
        class="form-control" 
        placeholder="Nome" 
        required
      >
      <div v-if="isSubmitted && $v.user.name.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="email">Coloque seu melhor Email:</label>
      <input v-model="user.email" :class="{'is-invalid': isSubmitted && $v.user.email.$error}" type="email" class="form-control" placeholder="Email" required>
      <div v-if="isSubmitted && $v.user.email.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="password">Senha para acesso:</label>
      <input v-model="user.password" :class="{'is-invalid': isSubmitted && $v.user.password.$error}" type="password" class="form-control" placeholder="Senha" required>
      <div v-if="isSubmitted && $v.user.password.$required" class="invalid-feedback"></div>
    </div>
    <div class="input-container">
      <label for="description">Em que área ele irá atuar ?</label>
      <input v-model="user.description" :class="{'is-invalid': isSubmitted && $v.user.description.$error}" class="form-control" placeholder="Função" required>
      <div v-if="isSubmitted && $v.user.description.$required" class="invalid-feedback"></div>
    </div>
    <div class="select-container">
      <div class="select" style="padding-right: 24px;">
        <label for="work" style="padding-left: 2px;">Idade:</label>
        <input v-model="user.age" :class="{'is-invalid': isSubmitted && $v.user.age.$error}" style="width: 40px;" name="age" id="age" required>
      </div>
      <div class="select">
        <label for="owner">Permissão</label>
        <select name="owner" id="owner" v-model="user.owner" :class="{'is-invalid': isSubmitted && $v.user.owner.$error}">
          <option value=false>Comum</option>
          <option value=true>Admin</option>
          <!-- <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>       -->
        </select>
      </div>
      <!-- <div v-if="isSubmitted && $v.user.owner.$required" class="invalid-feedback"></div>       -->
    </div>
    <div class="input-container">
          <input @click="submitNewUser" class="submit-btn" type="submit" value="Cadastrar!">
              <!-- <font-awesome-icon :icon="['fas', 'user-plus']" /> -->
    </div> 
  </form>
</template>

<script>
import { required } from '@vuelidate/validators'
import TaskService from '../../services/TaskService';
import axios from "axios";
import Api from '../../services/Api';

export default {
  name: "Register",
  data(){
    return {
      user: {
       email: null,
       password: null,
       name: null,
       age: Number(null),
       description: null,
       owner: Boolean(null),
    },
    isSubmitted: false,
  }
  },
  validations:{
    user: {
      email: {required},
       password: {required},
       name: {required},
       age: {required},
       description: {required},
       owner: {required},
    }
  },
  methods: {
    handleSubmitForm() {
       this.isSubmitted = true;

          // this.$v.$touch();
          // if (this.$v.$invalid) {
          //   return;
          // }
    
    },
    async submitNewUser(){
         try {
           await TaskService.createNewUser(this.user)
          //  await axios.post(`http://localhost:3000/task`, (this.user))
           this.$router.push({
             name: 'registro',
           }).catch(() => {});;
         } catch (error) {
             return console.log(error, "submit")
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
    color:#fc03b1;
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
    color: #fc03b1;
  }
</style>