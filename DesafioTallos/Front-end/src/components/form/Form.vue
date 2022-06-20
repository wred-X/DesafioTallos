<template>
    <div>
        <h2>Login</h2>
        <form id="login-form" method="POST" @submit="login">
        <div class="input-container">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" v-model="email" placeholder="Digite o seu email">
        </div>
        <div class="input-container">
            <label for="password">Senha:</label>
            <input type="text" id="password" name="password" v-model="password" placeholder="Digite sua senha">
        </div>
      <!-- <div class="input-container">
        <label for="pao">Escolha o pão:</label>
        <select name="pao" id="pao" v-model="pao">
          <option value="">Selecione o seu pão</option>
          <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
        </select>
      </div> -->
      <!-- <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
        </select>
      </div> -->
      <!-- <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
          <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
          <span>{{ opcional.tipo }}</span>
        </div>
      </div> -->
      <div class="input-container">
        <input class="submit-btn" type="submit" value="entrar">
      </div>
    </form>
    </div>
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