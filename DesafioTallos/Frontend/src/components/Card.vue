<template >
<div style="display: flex;
    align-items: center;
    flex-direction: column;">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Procurar por nome.."/>
      <label style="margin-left: 3vh;">Resultado de pesquisa:</label>
    </div>
    <div class="wrapper">
    <div @submit.prevent v-for="funcionario in filteredList" :key="funcionario._id" class="card">
    <img src="/img/avatar.png" alt="Person" class="card__image">
    <p class="card__name">{{funcionario.name}}</p>
    <div class="grid-container">

      <div class="grid-child-posts">
        Idade: {{funcionario.age}}
      </div>

      <div class="grid-child-followers">
        Carga: 8h
      </div>

    </div>
    <button class="btn draw-border" @click="submitViewUser(funcionario._id)" >Informações</button>
    <button v-show="this.owner===true" @click="submitEditUser(funcionario._id)"  class="btn draw-border">Alterações</button>
  </div>
  </div>
  </div>
  <div v-if="this.users.lenght === 0">testeeeeeee</div>
</template>
<script>
import { RouterLink } from 'vue-router'
import axios from 'axios';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
  name: 'Card',
  data() {
    return { 
      users:[],
      owner: null,
      search: ''
    }
  },
   mounted() {
     this.getAll();
     this.newUser();
   },
   methods: {
     async getAll(){
       const response = await axios.get('http://localhost:3000/tasks')
       if(response.status == 200){
         const dataUser = this.users = response.data
         this.owner = this.$store.state.user.owner
         return this.users = dataUser.filter(user => user.name !== this.$store.state.user.name)
       }else{
         console.log(error)
       }
     },
     //filtrando usuario logado na lista de usuarios
     async newUser(){
        socket.on('task', (response) => {
          const dataUser = this.users = response
          return this.users = dataUser.filter(user => user.name !== this.$store.state.user.name)
        });
      },
     async submitViewUser(profile){
          try {
            localStorage.removeItem('findId')
            this.$router.push({
              name: 'perfil',
            }).catch(() => {});
            return localStorage.setItem('findId', JSON.stringify(profile));
          } catch (error) {
            return console.log(error)
          }
     },
     async submitEditUser(profile){
          try {
            localStorage.removeItem('findId')
            this.$router.push({
              name: 'edit',
            }).catch(() => {});
            return localStorage.setItem('findId', JSON.stringify(profile));
          } catch (error) {
             return console.log(error)
          }
     }
   },
   computed: {
      filteredList() {
        return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }   
    }
}
</script>

<style scoped>
.search-wrapper {
  position: initial;
}
.label {
    position: absolute;
    font-size: 12px;
    color: rgba(0,0,0,.50);
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: .15s all ease-in-out;
}
.input {
    padding: 4px 12px;
    color: rgba(0,0,0,.70);
    border: 1px solid rgba(0,0,0,.12);
    transition: .15s all ease-in-out;
    background: white;
}
.wrapper {
    flex-wrap: wrap;
    padding-top: 12px;
    padding-bottom: 18px;
    align-items: center;
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-gap: 50px;
    justify-content: center;
    background-color: #f5f5f5;
    font-family: 'Baloo Paaji 2', cursive;
    padding-bottom: 50px;
  }
.card {
  background-color: #222831;
  padding-bottom: 18px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.7);
  color: white;
}

.card__name {
  margin-top: 15px;
  font-size: 1.5em;
}

.card__image {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: 5px solid #272133;
  margin-top: 20px;
  box-shadow: 0 10px 50px #fc03b1;
}


.draw-border {
  box-shadow: inset 0 0 0 4px #a134f6;
  color: #a134f6;
  -webkit-transition: color 0.25s 0.0833333333s;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}

.draw-border::before,
.draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0rem;
  height: 0;
  bottom: 0;
  right: 0;
}

.draw-border::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}

.draw-border::after {
  border-top-width: 4px;
  border-right-width: 4px;
}

.draw-border:hover {
  color: #eb196e;
}

.draw-border:hover::before,
.draw-border:hover::after {
  border-color: #eb196e;
  -webkit-transition: border-color 0s, width 0.25s, height 0.25s;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}

.draw-border:hover::before {
  -webkit-transition-delay: 0s, 0s, 0.25s;
  transition-delay: 0s, 0s, 0.25s;
}

.draw-border:hover::after {
  -webkit-transition-delay: 0s, 0.25s, 0s;
  transition-delay: 0s, 0.25s, 0s;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 0.75em 2em;
  letter-spacing: 0.05rem;
  margin: 13px;
  width: 13rem;
}

.btn:focus {
  outline: 2px dotted #55d7dc;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  font-size: 1.2em;
}

</style>