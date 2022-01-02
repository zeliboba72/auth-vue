import { createStore } from 'vuex';

export default createStore({
  state: {
    login: false,
    username: null,
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
