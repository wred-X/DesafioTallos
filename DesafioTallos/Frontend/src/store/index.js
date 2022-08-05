import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Swal from 'sweetalert2';
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
    },
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
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  plugins: [createPersistedState()],
});
