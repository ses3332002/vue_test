export default {
  state: {
    isAuth: false,
    defaultLogin: 'test@test.com',
    deaultPassword: 'Qwerty123'
  },

  getters: {
    auth(state) {
      return state.isAuth;
    }
  },

  mutations: {
    setAuth(state) {
      state.isAuth = true;
    },
    unsetAuth(state) {
      state.isAuth = false;
    },
    checkAuth(state, payload) {
      if (
        state.defaultLogin === payload.email &&
        state.deaultPassword === payload.password
      ) {
        state.isAuth = true;
      }
    }
  }
};
