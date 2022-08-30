import Vue from 'vue';
import Vuex from 'vuex';
import users from './usersModule';
import settings from './settingsModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: {
      namespaced: true,
      ...users
    },
    settings: {
      namespaced: true,
      ...settings
    }
  }
});
