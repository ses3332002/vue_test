<template>
  <footer class="md-elevation-3 md-layout md-alignment-center-center">
    <span class="md-subheading">{{
      `In selection: ${usersToShow.length}. Total: ${users.length}`
    }}</span>
  </footer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('users', { users: (state) => state.users }),
    ...mapGetters('users', ['usersToShow'])
  }
};
</script>
