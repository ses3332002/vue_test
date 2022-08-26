<template>
  <header class="md-elevation-3 md-layout md-alignment-center-space-between">
    <span class="md-title">{{
      $store.getters.auth ? 'Welcome, User' : 'Title'
    }}</span>
    <md-dialog
      :md-active.sync="modalVisible"
      :md-click-outside-to-close="false"
    >
      <md-dialog-title>Enter your credentials</md-dialog-title>
      <md-content class="dialog_content">
        <md-field class="input" md-clearable>
          <md-input
            type="text"
            required
            maxlength="30"
            md-counter="false"
            placeholder="enter email"
            v-model="email"
          />
        </md-field>
        <md-field class="input">
          <md-input
            required
            maxlength="30"
            md-counter="false"
            placeholder="enter password"
            v-model="password"
            type="password"
            @keydown.enter="confirmHandler"
          />
        </md-field>
        <div v-if="message !== ''" class="message">{{ message }}</div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelHandler">Cancel</md-button>
        <md-button class="md-primary" @click="confirmHandler">Check</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-dense md-raised md-primary" @click="loginHandler">
      {{ $store.getters.auth ? 'Logout' : 'Login' }}
    </md-button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    loginHandler() {
      if (this.$store.getters.auth) {
        this.$store.commit('unsetAuth');
      } else {
        this.modalVisible = true;
      }
    },
    cancelHandler() {
      this.modalVisible = false;
      this.email = '';
      this.password = '';
      this.message = '';
    },
    confirmHandler() {
      if (this.email === '' || this.password === '') {
        return;
      }
      this.$store.commit('checkAuth', {
        email: this.email,
        password: this.password
      });
      if (this.$store.getters.auth) {
        this.modalVisible = false;
        this.email = '';
        this.password = '';
        this.message = '';
      } else {
        this.message = 'Wrong credentials';
      }
    }
  }
};
</script>

<style scoped>
header {
  padding: 0 16px;
}

.dialog_content {
  padding: 16px;
}

.message {
  color: red;
}
</style>
