<template style="background-color: #f5f5f5;">
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
  name: "welcome",
  mounted() {
    this.showAlert();
  },
  methods: {
    async showAlert() {
      const response = await axios.get('http://localhost:3000/tasks/me')
        console.log(response, 'current user')
          console.log(response.status)
      if(response.status == 200){
          this.$store.dispatch('USER_SET', response.data)
          socket.emit('userLog', {name: response.data.name, _id: response.data.id},
            () => {
              this.$store.dispatch('joinSet', true)
            });
          console.log(response.data)
          console.log(this.$store.state.user)
      }else{
        console.log(error)
      }
      // Use sweetalert2
      Swal.fire({
        title:'Bem vindo ao sistema Tallos!',
        text:'Tenha um excelente dia de trabalho!',
        icon:'success',
        confirmButtonColor: '#00ff7f'      
        }).then((result) => {
        if (result.isConfirmed) {
            this.$router.push({
                name: 'home',
            }).catch(() => {});;   
        }
      })
    }
  },
}
</script>