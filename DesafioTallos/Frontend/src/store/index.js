import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
//import * as types from './mutation-types';

export const store = createStore({
  state: {
    user: [],
    status: '',
    token: '',
    joined: false,
    newUser: {},
  },
  mutations: {
    AUTH_SUCCESS(state, payload) {
      state.status = payload;
      state.token = localStorage.getItem('token');
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    AUTH_ERROR(state) {
      state.status = payload;
    },
    SOCKET_JOIN(state, payload) {
      state.joined = payload;
    },
    NEW_LOG(state, payload) {
      state.newUser = payload;
    },
    AUTH_LOGOUT(state) {
      state.token = '';
      state.status = '';
    },
  },
  actions: {
    AUTH_SET(context, payload) {
      const data = payload.data;
      const status = payload.status;
      try {
        axios.defaults.headers.common['Authorization'] = data.access_token;
        localStorage.setItem('token', JSON.stringify(data.access_token));
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log(status);
        context.commit('AUTH_SUCCESS', status);
      } catch (err) {
        axios.defaults.headers.common['Authorization'] = null;
        context.commit(AUTH_ERROR, err);
        localStorage.removeItem('token');
      }
      //console.log(payload, 'actions');
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
    AUTH_LOGOUT: (context) => {
      return new Promise((resolve, reject) => {
        context.commit('AUTH_LOGOUT');
        localStorage.removeItem('user-token');
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
