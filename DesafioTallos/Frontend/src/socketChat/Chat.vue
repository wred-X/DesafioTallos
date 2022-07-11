<template>
  <div class="chat">
    <div >
      <form @submit.prevent="join">
        <label>Qual seu nome?</label>
        <input v-model="name"/>
        <button type="submit">Enviar!</button>
      </form>
    </div>
    <div class="chat-container">
      <div class="messages-container">
        <div v-for="message in messages">
          [{{message.name}}]: {{message.text}}
        </div>
      </div>
    </div>
    <div v-if="typingDisplay">{{typingDisplay}}</div>
    <hr/>
    <div class="message-input">
      <form @submit.prevent="sendMessage">
        <label>Mensagem:</label>
        <input v-model="messageText" @input="emitTyping"/>
        <button type="submit">Enviar!</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client'
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3000')

const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const typingDisplay = ref('');

onBeforeMount(() =>{
  socket.emit('findAllMessages', {}, (response) => {
    messages.value = response;
  });

  socket.on('message', (message) => {
    messages.value.push(message);
  });

  socket.on('typing', ({name, isTyping}) => {
    if (isTyping) {
      typingDisplay.value = `${name} está digitando...`;
    } else {
      typingDisplay.value = '';
    }
  })
});

const join = () => {
  socket.emit('join', {name: name.value },
  () => {
    joined.value = true;
  });
}

 const sendMessage = () => {
   socket.emit('createMessage', {text: messageText.value}, () => {
     messageText.value = '';
   });
 }

let timeout;
const emitTyping = () => {
  socket.emit('typing', {isTyping: true});
  timeout = setTimeout(() => {
    socket.emit('typing', {isTyping: false});
  }, 2000);
}

</script>

<style scoped>
.chat {
  padding: 20px;
  height: 100vh;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.messages-container {
  flex: 1;
}
</style>