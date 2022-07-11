<template>
  <div class="login">
     <Logo/>
    <form id="login-form" @submit.prevent="handleSubmitForm()">
      <div class="input-container">
          <label for="email">Email:</label>
          <input v-model="user.email" type="email" :class="{'is-invalid': isSubmitted && $v.user.email.$error}" id="email" name="email" placeholder="Digite o seu email" required>
          <div v-if="isSubmitted && $v.user.email.$required" class="invalid-feedback"></div>
        </div>
        <div class="input-container">
          <label for="password">Senha:</label>
          <input v-model="user.password" type="password" :class="{'is-invalid': isSubmitted && $v.user.password.$error}" id="password" name="password" placeholder="Digite sua senha" required>
          <div v-if="isSubmitted && $v.user.password.$required" class="invalid-feedback"></div>
        </div>
        <div class="input-container">
          <input @click="submitLogin" class="submit-btn" type="submit" value="Entrar!">
        </div>
    </form>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators'
import Logo from '../Logo.vue';
import {useStore} from "vuex";
import axios from "axios";
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
    name: "Login",
    components: {
    Logo,
},
    data(){
    return {
      user: {
        email: null,
        password: null,
    },
    isSubmitted: false,
  }
  },
   setup () {
    const store = useStore()
  },
  validations:{
    user: {
      email: {required},
       password: {required},
    }
  },
  methods: {
    handleSubmitForm() {
       this.isSubmitted = true;
    },
    async submitLogin(){
         try {
          //  await TaskService.createNewUser(this.user)
           const response = await axios.post('http://localhost:3000/login', this.user)
           await this.$store.dispatch('authSet',response.data)
           socket.emit('userLog', {name: response.data.user.name },
           () => {
            this.$store.dispatch('joinSet', true)
           });
           this.$router.push({
             name: 'home',
           }).catch(() => {});;
         } catch (error) {
            return console.log(error)
         }
       }
  }
}
</script>

<style scoped>
  .login {
    background-color: #a134f6;
    display: flex;
  }
  .container_logo{
    width: 100%;
  }
  #login-form {
   align-items: center;
   margin-top: 13%;
   padding-right: 5%;
   padding-left: 5%;
  }

  .input-container {
    display:flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    margin-right: 77%;
    margin-left: 4px;
    color: #222;;
    padding: 5px 10px;
    border-left: 5px solid #000;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
    align-self: center;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
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