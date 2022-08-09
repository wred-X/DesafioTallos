<template>
  <div class="login">
    <div>
      <Logo/>
    </div>
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
import Swal from 'sweetalert2';
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
          const token = localStorage.getItem('token');
          if (token !== response.data.access_token ){
            await this.$store.dispatch('AUTH_SET', response)
            this.$router.push({
              name: 'myPicture',
            }).catch(() => {});;
           } else {
            this.$router.push({
             name: 'login',
           }).catch(() => {});;
           }
        } catch (error) {
            Swal.fire({
              title:'Ops!',
              text:'Email ou senha estão incorretos!',
              icon:'warning',
              confirmButtonColor: '#00ff7f',
              confirmButtonText: 'Entendido!'      
            })
            return console.log(error)
        }
    },
  }
}
</script>

<style scoped>
  .login {
    background-color: #c968c9;
    display: flex;
  }
  .container_logo{
    width: 150vh;
    height: 100vh;
  }
  #login-form {
   width: 50vh;
   height: 100vh;
   display:flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   padding-left: 7%;
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