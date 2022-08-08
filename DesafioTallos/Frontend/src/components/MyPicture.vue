<template class="container">
  <div id="app" class="web-camera-container">
    <div class="camera-button">
      <button v-if="!isPhotoTaken" type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
        <span v-if="!isCameraOpen">Registro</span>
        <span v-else>Fechar camera</span>
      </button>
    </div>
  
    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  
    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
      
      <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
        
      <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
      
      <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
    </div>
    
    <div v-if="!isPhotoTaken && isCameraOpen && !isLoading" class="camera-shoot">
      <button type="button" class="button" @click="takePhoto">
        <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
      </button>
    </div>

    <div style="display:flex;">
      <div v-if="isPhotoTaken && isCameraOpen" class="camera-shoot">
        <a type="button" class="button" style="display:flex; flex-direction:column; justify-content: center;
    align-items: center;" @click="cancelPhoto">
        <button type="button">
          <img src="https://img.icons8.com/x">
        </button>
          Cancelar!
        </a>
      </div>
      
      <div v-if="isPhotoTaken && isCameraOpen" class="camera-shoot">
        <a type="button" class="button" style="display:flex; flex-direction:column; justify-content: center;
          align-items: center;" @click="confirmPhoto">
        <button type="button">
          <img src="https://img.icons8.com/double-tick">
        </button>
        Registrar ponto!
        </a>
      </div>

      <div v-if="isPhotoTaken && isCameraOpen" class="camera-shoot">
      <a id="downloadPhoto" download="my-photo.jpg" class="button" style="display:flex; flex-direction:column; justify-content: center;
    align-items: center;" role="button" @click="downloadImage">
        <button type="button">
          <img src="https://img.icons8.com/download">
        </button>
          Baixar Imagem!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
  name: "myPicture",
  components: {
  },
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#'
    }
  },
  mounted() {
    this.showAlert();
  },
  
  methods: {
    async showAlert() {
      const response = await axios.get('http://localhost:3000/tasks/me')
      if(response.status == 200){
          this.$store.dispatch('USER_SET', response.data)
          socket.emit('userLog', {name: response.data.name, _id: response.data.id},
            () => {
              this.$store.dispatch('joinSet', true)
            });
      }else{
        console.log(error)
      }
      // Use sweetalert2
      Swal.fire({
        title:'Bem vindo ao sistema Tallos!',
        text:'Registre seu ponto para inciar suas horas!',
        icon:'success',
        confirmButtonColor: '#00ff7f'      
      })
    },
    toggleCamera() {
      if(this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    
    createCameraElement() {
      this.isLoading = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: true
			});


			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          this.isLoading = false;
					this.$refs.camera.srcObject = stream;
				})
				.catch(error => {
          this.isLoading = false;
					alert("Talvez o browser não esteja suportando");
				});
    },
    
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
    },
    
    takePhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken = !this.isPhotoTaken;
      
      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    cancelPhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = false;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken = !this.isPhotoTaken;
    },

    confirmPhoto() {
      const date = new Date().toLocaleTimeString();
      this.$router.push({
        name: 'home',
      }).catch(() => {});
      Swal.fire({
        title:'Entrada registrada!',
        text:'Tenha um excelente dia de trabalho!',
        icon:'success',
        confirmButtonColor: '#00ff7f'      
      })
      this.$store.dispatch('DATE_SET', date)
      this.stopCameraStream()
    },
    
    downloadImage() {
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
    .replace("image/jpeg", "image/octet-stream");
      download.setAttribute("href", canvas);
    }
  }
}
</script>

<style scoped>
.container{
  background-color: #f5f5f5;
}
body {
  display: flex;
  justify-content: center;
}

.web-camera-container {
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  }

  .camera-button {
    margin-bottom: 2rem;
  }
  
  .camera-shutter {    
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;
  }

  .flash {
        opacity: 1;
  }
  
  .camera-shoot {
    margin: 1rem 1rem;
    width: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
    }

    img {
        height: 35px;
        object-fit: cover;
      }
  
  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
  }
    
    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;
    }
      
      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;
      }
        
        :nth-child(2) {
          animation-delay: .2s;
        }
        
        :nth-child(3) {
          animation-delay: .4s;
        }

  ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

  @keyframes preload {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
 
</style>