<template>
  <md-content class="cards md-scrollbar md-layout md-alignment-top-center">
    <md-empty-state
      v-if="usersToShow.length === 0"
      md-icon="no_accounts"
      md-label="No data in list"
    />
    <user-card
      v-else
      v-for="(user, index) in usersToShow"
      :key="index"
      :user="user"
      class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
    />
  </md-content>
</template>

<script>
import UserCard from './UserCard.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('users');

export default {
  components: {
    UserCard
  },
  computed: {
    ...mapGetters(['usersToShow'])
  }
};
</script>

<style lang="scss" scoped>
.cards {
  padding: 16px;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #fafafa !important;
  gap: 16px;
}
</style>
