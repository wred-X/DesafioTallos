<template>
  <UserInfo/>
  <div id="toast"><div id="img">Olá!</div><div id="desc">{{userSocket}} está online!</div></div>
  <div>
    <div>
      <div v-if="this.owner===true" class="Home">
        <!-- <label class="Title">Admin</label> -->
        <label class="work">Esses são os seus Funcionarios:</label>
        <div class="workers">
          <Card/>
        </div>
      </div>
      <div v-else class="Home">
        <!-- <label class="Title">Home de Funcionario</label> -->
        <label class="work">Esses são seus colegas de trabalho:</label>
        <div class="workers">
          <Card/>
        </div>
      </div>
    </div>
  </div>

 
</template>
<script>
import UserInfo from './form/UserInfo.vue'
import Autocomplete from './Search.vue';
import Card from './Card.vue'
import Swal from 'sweetalert2';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
  name: 'HomeOwner',
  components:{
    Card,
    UserInfo,
},
  data() {
    return {
      teste: 0,
      userSocket: null,
      idCompare: null,
      owner: this.$store.state.owner,
    }
  },
  mounted() {
    this.userIn();
      socket.on('user-login', (response) => {
        let sessionId = localStorage.getItem('idUser')
        if ( String(sessionId) == String(response)){
          setTimeout(() => {
          Swal.fire({
            title: 'Você já está logado!',
            ext: 'Essa conta não permite acesso simultaneo',
            icon: 'error',
            confirmButtonColor: '#00ff7f',
            confirmButtonText: 'Entendido!',
          })
          this.submitLogOut()
          }, 3000)
        }
        else{
            console.log('primeiro login')
        }
        })
  },
  methods: {
  
     async userIn() {
   
       socket.on('userLog', (response) => {
         this.userSocket = response.name;
    
         if (this.userSocket !== this.$store.state.user.name){
           return this.launch_toast();
         }
       });
     },
    async submitLogOut () {
        await this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
        this.$router.push('/login')
      })
    },
    launch_toast() {
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 7000);
    },
  },
}
</script>

<style scoped>
.Home {
    display: grid;
    height: 100vh; /* Note a medida */
    background-color: #f5f5f5;
  }
.Title {
  font-size: 40px;
  text-align: start;
  font-family: 'Baloo Paaji 2', cursive;
}
.work {
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 30px;
  text-align: center;
  font-family: 'Baloo Paaji 2', cursive;
}
.workers {
  display: grid;
  justify-content: center;
  padding-bottom: 50px;
}

#toast {
    visibility: hidden;
    max-width: 50px;
    height: 50px;
    /*margin-left: -125px;*/
    margin: auto;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;

    position: fixed;
    z-index: 1;
    left: 0;right:0;
    bottom: 30px;
    font-size: 17px;
    white-space: nowrap;
}

#toast #img{
	width: 50px;
	height: 50px;
    
    float: left;
    
    padding-top: 16px;
    padding-bottom: 16px;
    
    box-sizing: border-box;

    
    background-color: #111;
    color: #fff;
}

#toast #desc{

    
    color: #fff;
   
    padding: 16px;
    
    overflow: hidden;
	white-space: nowrap;
}

#toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {min-width: 350px}
}

@keyframes expand {
    from {min-width: 50px}
    to {min-width: 350px}
}
@-webkit-keyframes stay {
    from {min-width: 350px} 
    to {min-width: 350px}
}

@keyframes stay {
    from {min-width: 350px}
    to {min-width: 350px}
}
@-webkit-keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>