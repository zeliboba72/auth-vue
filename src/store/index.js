import { createStore } from 'vuex';
import { Routes } from '../router/routes';
import { phoneMask, codeMask } from "../custom/masks";

export default createStore({
  state: {
    login: false,
    username: null,
    routes: Routes,
    phoneMask,
    codeMask,
  },
  mutations: {
    login(state, payload) {
      state.username = payload.username;
      state.login = true;
    },
    logout(state) {
      state.username = null;
      state.login = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
