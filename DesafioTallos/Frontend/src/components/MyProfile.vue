<template>
<div v-for="funcionario in get_all" :key="funcionario._id" class="container">
    <div class="card">
        <img src="/img/avatar.png" alt="Person" class="card__image">
        <p class="card__name" style="font-family: 'Baloo Paaji 2', cursive;">{{$store.state.user.name}}</p>
    </div>
    <div class="info-container">
        <div class="card-info">
            <h6 class="info">Seus dados pessoais :</h6>
            <div class="row">
                <div class="infodiv">
                    <p class="nameinfo">Email :</p>
                    <h6 class="text-muted">{{$store.state.user.email}}</h6>
                </div>
                <div class="infodiv">
                    <p class="nameinfo">Idade :</p>
                    <h6 class="text-muted">{{$store.state.user.age}}</h6>
                </div>
                <div class="infodiv">
                    <p class="nameinfo">Area de atuação :</p>
                    <h6 class="text-muted" style="text-align: center;">{{$store.state.user.description}}</h6>
                </div>
                <div class="infodiv">
                    <p class="nameinfo">Telefone :</p>
                    <h6 class="text-muted">85 96038982</h6>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'MyProfile',
  data() {
    return { 
      get_all:[
        {_id: 1, usuario: 'Wesley Romão', age: 20,  work: "Dono",
      email: "teste@gmail.com"},
      ],
      owner: true,
    }
  },
}
</script>

<style scoped>
.container{
    background-color: #222831;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #f5f5f5;
}
.card {
  padding-left: 60px;
  padding-right: 60px;
  background-color: #222831;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.card__name {
  margin-top: 40px;
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
  color: #ffe593;
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

.info-container {
  justify-content: center;
  display: grid;
  font-size: 1.2em;
  width: 75%;
}

h6 {
    font-size: 22px;
}

.card .card-info p {
    line-height: 300px;
}

.card-info {
    width: 150%;
    padding-left: 0px;
    padding-top: 2em;
    padding-right: 2em;
    padding-bottom: 2em;
    justify-content: space-between;
    align-self: center;
}
.info{
    font-weight: bold;
    font-size: 1.2em;
}
.nameinfo{
    margin-top: 4%;
    padding: 5px 10px;
    border-left: 5px solid #000;
    font-weight: bold;
}

.text-muted {
    border: 1px solid #000;
    background-color: #fff;
    text-align: center;
    margin-top: 14px;
    color: #000 !important;
    font-family: 'Baloo Paaji 2', cursive;
}

</style>