<template>
  <div>
    <h1>Home de Dono.</h1>
    <p>Empregados:</p>
    <ul>
      <li v-for="funcionario in get_all" :key="funcionario._id">{{funcionario.usuario}}, {{funcionario.age}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Dono',
  data() {
    return { 
      // get_all:["Eu","eu mesmo","eu de novo"]
      get_all:[
        {_id: 1, usuario: 'Sandro', age: 20},
        {_id: 2, usuario: 'Joe', age: 22},
        {_id: 3, usuario: 'Ronaldo', age: 9},
      ]
    }
  }
}
</script>