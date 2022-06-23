<template>
  <form class="container-register" @submit.prevent="submit">
    <div class="title-container">
      <h1 class="title">Casdastro de funcionarios!</h1>
    </div>
    <div class="input-container">
      <label for="name">Nome do funcionario:</label>
      <input v-model="data.name" class="form-control" placeholder="Nome" required>
    </div>
    <div class="input-container">
      <label for="email">Coloque seu melhor Email:</label>
      <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>
    </div>
    <div class="input-container">
      <label for="password">Senha para acesso:</label>
      <input v-model="data.password" type="password" class="form-control" placeholder="Senha" required>
    </div>
    <div class="input-container">
      <label for="work">Em que área ele irá atuar ?</label>
      <input v-model="data.work" class="form-control" placeholder="Função" required>
    </div>
    <div class="select-container">
      <div class="select">
        <label for="work" style="padding-left: 2px;">Idade</label>
        <select name="age" id="age" v-model="age">
          <option value="">idade</option>
        </select>
      </div>
      <div class="select">
        <label for="work">Permissão</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">admin</option>
          <!-- <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>       -->
        </select>
      </div>
    </div>
    <div class="input-container">
          <input class="submit-btn" type="submit" value="Cadastrar!">
    </div>
  </form>
</template>

<script>
import {reactive} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      await router.push('/home');
    }

    return {
      data,
      submit
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
  padding-top: 1%;
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
    width: 80px;
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