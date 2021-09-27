import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entry: null,
    token: null,
  },
  mutations: {
    setEntry(state, entry) {
      state.entry = entry;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
});
