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
    login: (state, id, name, type) => {
      if (id && type && name) {
        state.id = id;
        state.name = name;
        state.type = type;
        state.login = true;
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("type", type);
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
    login: ({ commit }, id, name, type) => {
      commit("login", id, name, type);
    }
  },
  modules: {}
});
