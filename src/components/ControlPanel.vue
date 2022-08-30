<template>
  <div>
    <div class="md-layout md-alignment-bottom-center">
      <md-field class="input" md-clearable>
        <md-input
          type="text"
          placeholder="search for name"
          v-model="searchString"
          @md-clear="clearHandler"
        />
      </md-field>
      <md-field class="filter">
        <label for="sorting">Name sorting</label>
        <md-select v-model="sorting" name="sorting" id="sorting" md-dense>
          <md-option value="asis">As is</md-option>
          <md-option value="asc">Ascend</md-option>
          <md-option value="desc">Descend</md-option>
        </md-select>
      </md-field>
      <md-field class="filter">
        <label for="gender">Gender</label>
        <md-select v-model="gender" name="gender" id="gender" md-dense>
          <md-option value="all">All</md-option>
          <md-option value="male">Male</md-option>
          <md-option value="female">Female</md-option>
        </md-select>
      </md-field>
      <router-link v-if="isAuth" :to="'edit/new'">
        <md-button class="md-dense md-raised new_user">New user</md-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('settings', { isAuth: (state) => state.isAuth }),
    ...mapState('users', {
      searchStringRO: (state) => state.searchString,
      genderRO: (state) => state.genderFilter,
      sortingRO: (state) => state.nameSorting
    }),
    searchString: {
      get() {
        return this.searchStringRO;
      },
      set(value) {
        this.setSearchString(value);
      }
    },
    gender: {
      get() {
        return this.genderRO;
      },
      set(value) {
        this.setGenderFilter(value);
      }
    },
    sorting: {
      get() {
        return this.sortingRO;
      },
      set(value) {
        this.setNameSorting(value);
      }
    }
  },
  methods: {
    ...mapMutations('users', [
      'setSearchString',
      'setGenderFilter',
      'setNameSorting'
    ]),
    clearHandler() {
      this.setSearchString('');
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  margin: 8px;
  width: 256px;
}

.filter {
  margin: 8px;
  width: 128px;
}

.md-menu-content {
  max-width: 96px !important;
}

.new_user {
  background-color: green !important;
  color: white !important;
  margin-bottom: 12px !important;
}
</style>
