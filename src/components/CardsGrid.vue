<template>
  <md-content class="cards md-scrollbar md-layout md-alignment-top-center">
    <md-empty-state
      v-if="$store.getters.usersToShow.length === 0"
      md-icon="no_accounts"
      md-label="No data in list"
    />
    <user-card
      v-else
      v-for="(user, index) in $store.getters.usersToShow"
      :key="index"
      :user="user"
      class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
    />
  </md-content>
</template>

<script>
import UserCard from './UserCard.vue';
export default {
  components: {
    UserCard
  }
};
</script>

<style scoped>
.cards {
  height: 100%;
  padding: 16px;
  max-height: calc(100vh - 192px);
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #fafafa !important;
}

.md-layout-item {
  margin: 8px;
}
</style>
