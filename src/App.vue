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

export default {
  name: 'App',
  created() {
    this.$store.dispatch('loadUsers');
  },

  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style scoped>
#app {
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: 48px 1fr 48px;
}

.work_area {
  height: calc(100vh - 96px);
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
</style>
