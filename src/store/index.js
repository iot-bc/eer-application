import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: null,
    name: null,
    type: null,
    login: false,
    sessionID: ""
  },
  getters: {
    getID: state => state.id,
    getType: state => state.type,
    getName: state => state.name,
    isLogin: state => state.login,
    getSessionID: state => state.sessionID
  },
  mutations: {
    login: (state, payload) => {
      if (payload.id && payload.type && payload.name) {
        state.id = payload.id;
        state.name = payload.name;
        state.type = payload.type;
        state.login = true;
        sessionStorage.setItem("id", payload.id);
        sessionStorage.setItem("name", payload.name);
        sessionStorage.setItem("type", payload.type);
        sessionStorage.setItem("login", "TRUE");
      }
    },
    logout: state => {
      sessionStorage.clear();
      state.id = null;
      state.name = null;
      state.type = null;
      state.login = false;
      state.sessionID = "";
    }
  },
  actions: {
    logout: ({ commit }) => {
      commit("logout");
    },
    login: ({ commit }, payload) => {
      commit("login", payload);
    }
  },
  modules: {}
});
