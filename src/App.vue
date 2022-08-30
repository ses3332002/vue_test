<template>
  <div id="app">
    <app-header />
    <router-view class="work_area" />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...mapActions('users', ['loadUsers'])
  }
};
</script>

<style lang="scss" scoped>
#app {
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: 48px 1fr 48px;

  .work_area {
    height: calc(100vh - 96px);
    width: 100%;
    max-width: 1200px;
    margin: auto;
  }
}
</style>
