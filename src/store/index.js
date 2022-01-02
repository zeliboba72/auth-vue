import { createStore } from 'vuex';

export default createStore({
  state: {
    username: null,
  },
  getters: {
    isLoggedIn(state) {
      return Boolean(state.username);
    }
  },
  mutations: {
    setUser(state, { username }) {
      state.username = username;
    },
  },
})
