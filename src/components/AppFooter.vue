<template>
  <footer class="md-elevation-3 md-layout md-alignment-center-center">
    <span class="md-subheading">{{
      `In selection: ${usersToShow.length}. Total: ${users.length}`
    }}</span>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapState } = createNamespacedHelpers('users');
export default {
  computed: {
    ...mapState({ users: 'users' }),
    ...mapGetters(['usersToShow'])
  }
};
</script>
