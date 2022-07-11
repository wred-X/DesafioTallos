<template>
  <form class="container-edit" @submit.prevent="submit">
    <div class="title-container">
      <h1 class="title">Alteração de dados!</h1>
    </div>
    <div class="input-container">
      <label for="name">Nome do funcionario:</label>
      <input v-model="user.name" class="form-control" placeholder="Nome" required>
    </div>
    <div class="input-container">
      <label for="email">Coloque seu melhor Email:</label>
      <input v-model="user.email" type="email" class="form-control" placeholder="Email" required>
    </div>
    <div class="input-container">
      <label for="password">Senha para acesso:</label>
      <input v-model="user.password" type="password" class="form-control" placeholder="Senha" required>
    </div>
    <div class="input-container">
      <label for="work">Em que área ele irá atuar ?</label>
      <input v-model="user.work" class="form-control" placeholder="Função" required>
    </div>
    <div class="select-container">
      <div class="select" style="padding-right: 24px;">
        <label for="work" style="padding-left: 2px;">Idade:</label>
        <input style="width: 40px;" name="age" id="age" v-model="age">
      </div>
      <div class="select">
        <label for="work">Permissão</label>
        <select name="work" id="work" v-model="work">
          <option value="">Comum</option>
          <option value="">Admin</option>
        </select>
      </div>
    </div>
    <div class="input-container">
          <input class="submit-btn" type="submit" value="Confirmar alteração!">
    </div>
  </form>
</template>

<script>
import { required } from '@vuelidate/validators'

export default {
  name: "Edit",
  data(){
    return {
      user: {
        email: null,
        password: null,
        name: null,
        age: parseInt(null),
        work: null,
        permission: null
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
       work: {required},
       permission: {required},
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
          //  await TaskService.createNewUser(this.user)
          //  await axios.put(`http://localhost:3000/task`, (this.user))
           const response = await axios.put('http://localhost:3000/tasks/', this.user)
          //  socket.emit('newUsers', {task: response}, (response) => {
          //     this.$store.dispatch('SOCKET_new', response)
          //   });
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
.container-edit{
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