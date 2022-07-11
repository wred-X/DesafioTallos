import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
//import * as types from './mutation-types';

export const store = createStore({
  state: {
    user: {
      _id: null,
      email: null,
      name: null,
      age: null,
      description: null,
      owner: null,
    },
    token: '',
    joined: false,
    newUser: {},
  },
  mutations: {
    authSet(state, payload) {
      state.token = payload.access_token;
      state.user = payload.user;
    },
    joinSet(state, payload) {
      state.joined = payload;
    },
    newSet(state, payload) {
      state.newUser = payload;
    },
  },
  actions: {
    authSet(context, payload) {
      context.commit('authSet', payload);
      //console.log(payload, 'actions');
    },
    joinSet(context, payload) {
      context.commit('joinSet', payload);
    },
    SOCKET_join: (context, payload) => {
      //state.onLine = data.onLine;
      context.commit('SOCKET_join', payload);
    },
    SOCKET_new: (context, payload) => {
      //state.onLine = data.onLine;
      context.commit('newSet', payload);
    },
  },
  plugins: [createPersistedState()],
});
