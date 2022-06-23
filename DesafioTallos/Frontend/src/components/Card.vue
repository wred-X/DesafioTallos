<template>
    <div v-for="funcionario in get_all" :key="funcionario._id" class="card">
    <img src="/img/avatar.png" alt="Person" class="card__image">
    <p class="card__name">{{funcionario.usuario}}</p>
    <div class="grid-container">

      <div class="grid-child-posts">
        Idade: {{funcionario.age}}
      </div>

      <div class="grid-child-followers">
        Carga: 8h/dia
      </div>

    </div>
    <button class="btn draw-border">Informações</button>
    <button v-show="owner" class="btn draw-border">Alterações</button>
  </div>

</template>
<script>
export default {
  name: 'Card',
  data() {
    return { 
      get_all:[
        {_id: 1, usuario: 'Neymar Jr.', age: 20},
        {_id: 2, usuario: 'Lebron James', age: 22},
        {_id: 3, usuario: 'Ronaldo Nazario', age: 26},
      ],
      owner: true,
    }
  },
}
</script>

<style scoped>
.card {
  background-color: #222831;
  height: 440px;
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
  grid-gap: 20px;
  font-size: 1.2em;
}

</style>