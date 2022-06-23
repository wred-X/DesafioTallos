<template>
<UserInfo/>
  <div class="Home">
    <!-- <label class="Title">Home de Funcionario</label> -->
    <label class="work">Esses são seus colegas de trabalho:</label>
    <div class="workers">
       <Card/>
    </div>
  </div>

 
</template>
<script>
import UserInfo from './form/UserInfo.vue'
import Card from './Card.vue'

export default {
  name: 'Home',
  components:{
    Card,
    UserInfo,
},
  data() {
    return { 
    }
  }
}
</script>

<style scoped>
.Home {
    display: grid;
    padding: 0 2rem;
    background-color: #f5f5f5;
  }
.Title {
  font-size: 40px;
  text-align: start;
}
.work {
  font-family: 'Baloo Paaji 2', cursive;
  margin-top: 40px;
  font-size: 30px;
  text-align: center;
}
.workers {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-gap: 50px;
  justify-content: center;
  align-items: center;
  height: 440px;
  background-color: #f5f5f5;
  font-family: 'Baloo Paaji 2', cursive;
}

</style>