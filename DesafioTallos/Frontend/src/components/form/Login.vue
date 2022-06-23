<template>
  <div class="login">
     <Logo/>
    <form id="login-form" @submit="submit">
      <div class="input-container">
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" v-model="email" placeholder="Digite o seu email">
        </div>
        <div class="input-container">
          <label for="password">Senha:</label>
          <input type="text" id="password" name="password" v-model="password" placeholder="Digite sua senha">
        </div>
        <div class="input-container">
          <input class="submit-btn" type="submit" value="Entrar!">
        </div>
    </form>
  </div>
</template>

<script>
import Logo from '../Logo.vue';
export default {
    name: "Login",
    components: {
    Logo,
},
    data() {
        return {
          email: null,
          password: null,
        }
    },
    methods: {
        entrar(e) {

        e.preventDefault();

        const email= this.email;
        const password= this.password;
        console.log("o email é:" + this.email);
        console.log("a senha é:" + this.password);
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