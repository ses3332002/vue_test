export default {
  state: {
    isAuth: false,
    defaultLogin: 'test@test.com',
    defaultPassword: 'Qwerty123'
  },

  mutations: {
    unsetAuth(state) {
      state.isAuth = false;
    },
    checkAuth(state, payload) {
      if (
        state.defaultLogin.toLowerCase() === payload.email.toLowerCase() &&
        state.defaultPassword === payload.password
      ) {
        state.isAuth = true;
      }
    }
  }
};
