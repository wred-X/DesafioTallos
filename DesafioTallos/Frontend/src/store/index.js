import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
//import * as types from './mutation-types';

export const store = createStore({
  state: {
    user: [],
    status: '',
    token: '',
    joined: false,
    newUser: {},
    myLog: null,
    idUser: '',
    date: '',
    register: false,
  },
  mutations: {
    AUTH_SUCCESS(state, payload) {
      state.status = payload;
      state.token = localStorage.getItem('token');
      state.idUser = localStorage.getItem('idUser');
    },
    USER_SET(state){
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    AUTH_ERROR(state, payload) {
      state.status = payload;
    },
    DATE_SET(state, payload){
      console.log('Horario de entrada', payload)
      state.register = true;
      state.date = payload;
    },
    SOCKET_JOIN(state, payload) {
      state.joined = payload;
    },
    NEW_LOG(state, payload) {
      state.newUser = payload;
    },
    NEW_LOGIN(state) {
      state.myLog = true;
    },
    AUTH_LOGOUT(state) {
      state.token = '';
      state.status = '';
      state.myLog = false;
      state.idUser = '';
      state.date = '';
    },
    WORK_TIME(state){
      const date = new Date().toLocaleTimeString();
      console.log('Horario de saída', date)
      function parse(horario) {
        let [hr, min, seg] = horario.split(':').map(v => parseInt(v));
        if (!min) { // para o caso de não ter os minutos
          min = 0;
        }
        if (!seg) { // para o caso de não ter os minutos
          seg = 0;
        }
        return seg + (min * 60) + (hr * 3600);
      }
      function duracao(entrada1, saida1) {
        return (parse(saida1) - parse(entrada1));
      }
      let diff = duracao(state.date, date)
      if (diff != 0) {
        let hr = Math.floor(diff / 3600);
        let min = Math.floor(diff / 60);
        let seg = diff - ((hr * 3600) + (min * 60));
        alert(`${hr} horas, ${min} minutos e ${seg} segundos trabalhados`);
      }
      state.register = false;   
    }
  },
  actions: {
    AUTH_SET(context, payload) {
      const data = payload.data;
      const status = payload.status;
      try {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.access_token}`;
        localStorage.setItem('token', data.access_token);
        context.commit('AUTH_SUCCESS', status);
      } catch (err) {
        axios.defaults.headers.common['Authorization'] = null;
        context.commit('AUTH_ERROR', err);
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        localStorage.removeItem('user');
        resolve();
      }
      //console.log(payload, 'actions');
    },
    USER_SET(context, payload){
      const data = payload;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('idUser', data.id)
      context.commit('USER_SET');
    },
    DATE_SET(context, payload){
      context.commit('DATE_SET', payload);
    },
    joinSet(context, payload) {
      context.commit('SOCKET_JOIN', payload);
    },
    SOCKET_join: (context, payload) => {
      //state.onLine = data.onLine;
      context.commit('SOCKET_join', payload);
    },
    SOCKET_new: (context, payload) => {
      //state.onLine = data.onLine;
      context.commit('NEW_LOG', payload);
    },
    SOCKET_LOG: (context) => {
      //state.onLine = data.onLine;
      context.commit('NEW_LOGIN');
    },
    AUTH_LOGOUT: (context) => {
      return new Promise((resolve, reject) => {
        context.commit('WORK_TIME');
        context.commit('AUTH_LOGOUT');
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
  },
  getters: {
    isOwner: (state) => state.user.owner,
    isRegister: (state) => state.register,
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  plugins: [createPersistedState()],
});
