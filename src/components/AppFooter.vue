<template>
  <footer class="md-elevation-3 md-layout md-alignment-center-center">
    <span class="md-subheading">{{
      `In selection: ${$store.getters.usersToShow.length}. Total: ${$store.getters.users.length}`
    }}</span>
  </footer>
</template>

<script>
export default {};
</script>
