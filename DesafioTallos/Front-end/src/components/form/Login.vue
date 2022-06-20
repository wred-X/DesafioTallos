<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>

    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
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
        // async login() {
        // const req = await fetch('http://localhost:3000/login')
        // const data = await req.json()

        // this.email = data.email
        // this.password = data.password
        // },
        // async entrar(e) {
        entrar(e) {


        e.preventDefault();

        //const data = {
        const email= this.email;
        const password= this.password;
        console.log("o email é:" + this.email);
        console.log("a senha é:" + this.password);
            //opcionais: Array.from(this.opcionais),
        //}

        // const dataJson = JSON.stringify(data)    

        // const req = await fetch("http://localhost:3000/burgers", {
        //     method: "POST",
        //     headers: { "Content-Type" : "application/json" },
        //     body: dataJson
        // });

        // const res = await req.json()

        // console.log(res)

        // this.msg = "Pedido realizado com sucesso!"

        // // clear message
        // setTimeout(() => this.msg = "", 3000)

        // // limpar campos
        // this.nome = ""
        // this.carne = ""
        // this.pao = ""
        // this.opcionais = []
            
        // }
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
    margin-left: 40px ;
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