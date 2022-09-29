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
      <router-link :to="isAuth ? 'edit/' + user.id.value : ''">
        <md-button class="md-icon-button md-primary" :disabled="!isAuth">
          <md-icon class="item">edit</md-icon>
        </md-button>
      </router-link>
      <md-button
        class="md-icon-button md-accent"
        @click="itemDeleteHandler"
        :disabled="!isAuth"
      >
        <md-icon class="item">delete_outline</md-icon>
      </md-button>
    </md-card-actions>
    <confirm-popup v-if="confirmPopupVisible" title="Delete record?">
      <template #actions>
        <md-button class="md-accent" @click="DeleteConfirmHandler">
          Confirm
        </md-button>
        <md-button class="md-primary" @click="DeleteCancelHandler">
          Cancel
        </md-button>
      </template>
    </confirm-popup>
  </md-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ConfirmPopup from './ConfirmPopup';

export default {
  name: 'UserCard',
  data() {
    return {
      confirmPopupVisible: false
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    ConfirmPopup
  },
  computed: {
    ...mapState('settings', { isAuth: 'isAuth' })
  },
  methods: {
    ...mapMutations('users', ['deleteUser']),

    itemDeleteHandler() {
      this.confirmPopupVisible = true;
    },
    DeleteConfirmHandler() {
      this.confirmPopupVisible = false;
      this.deleteUser(this.user.id.value);
    },
    DeleteCancelHandler() {
      this.confirmPopupVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
