<template>
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
</template>

<script>
export default {
    name: "Login",
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
  #login-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 5px solid #fcba03;
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
    color:#fcba03;
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
    color: #222;
  }
</style>