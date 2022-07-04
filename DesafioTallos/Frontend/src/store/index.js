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
  },
  mutations: {
    authSet(state, payload) {
      state.token = payload.access_token;
      state.user = payload.user;
      console.log('Estado global definido');
    },
  },
  actions: {
    authSet(context, payload) {
      context.commit('authSet', payload);
      console.log(payload, 'actions');
    },
  },
  plugins: [createPersistedState()],
});
