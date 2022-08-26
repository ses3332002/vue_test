<template>
  <md-card md-with-hover>
    <md-card-header>
      <md-card-header-text class="md-subheading">
        {{ `${user.name.title} ${user.name.first} ${user.name.last}` }}
      </md-card-header-text>
      <md-card-media v-if="user.picture && user.picture.large !== ''">
        <img :src="user.picture.large" alt="user picture" class="avatar" />
      </md-card-media>
    </md-card-header>
    <md-card-content>
      <div class="md-body-2">
        {{ user.email }}
      </div>
      Age: {{ user.dob.age }}
    </md-card-content>
    <md-card-actions>
      <router-link :to="$store.getters.auth ? 'edit/' + user.id.value : ''">
        <md-button
          class="md-icon-button md-primary"
          :disabled="!$store.getters.auth"
        >
          <md-icon class="item">edit</md-icon>
        </md-button>
      </router-link>
      <md-button
        class="md-icon-button md-accent"
        @click="itemDeleteHandler"
        :disabled="!$store.getters.auth"
      >
        <md-icon class="item">delete_outline</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    itemDeleteHandler() {
      this.$store.commit('deleteUser', this.user.id.value);
    }
  }
};
</script>

<style scoped>
.todo_item {
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.md-icon-button {
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
}

.item {
  height: 14px;
  width: 14px !important;
}

.avatar {
  border-radius: 50%;
}

.md-card {
  margin: 8px 0;
}
</style>
