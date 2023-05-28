import { createStore } from "vuex";

export default createStore({
  state: { loggedIn: false },
  getters: {},
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value; // mutation to update loggedIn state
    },
  },
  actions: {
    setLoggedIn({ commit }, value) {
      commit("SET_LOGGED_IN", value); // action to trigger mutation
    },
  },
  modules: {},
});
