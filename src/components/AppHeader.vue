<template>
  <header class="md-elevation-3 md-layout md-alignment-center-space-between">
    <span class="md-title">{{ isAuth ? 'Welcome, User' : 'Title' }}</span>
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
      {{ isAuth ? 'Logout' : 'Login' }}
    </md-button>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import TabHandler from '@/mixins/tabHandler';

const { mapMutations, mapState } = createNamespacedHelpers('settings');

export default {
  name: 'AppHeader',
  data() {
    return {
      modalVisible: false,
      email: '',
      password: '',
      message: ''
    };
  },
  computed: {
    ...mapState({ isAuth: 'isAuth' })
  },
  methods: {
    ...mapMutations(['unsetAuth', 'checkAuth']),
    loginHandler() {
      if (this.isAuth) {
        this.unsetAuth();
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
      this.checkAuth({
        email: this.email,
        password: this.password
      });
      if (this.isAuth) {
        this.modalVisible = false;
        this.email = '';
        this.password = '';
        this.message = '';
      } else {
        this.message = 'Wrong credentials';
      }
    }
  },
  mixins: [TabHandler]
};
</script>

<style lang="scss" scoped>
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
