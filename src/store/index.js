import Vue from 'vue';
import Vuex from 'vuex';
import users from './usersModule';
import settings from './settingsModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: {
      namespaced: true,
      state: users.state,
      actions: { ...users.actions },
      getters: { ...users.getters },
      mutations: { ...users.mutations }
    },
    settings: {
      namespaced: true,
      state: settings.state,
      mutations: { ...settings.mutations }
    }
  }
});
