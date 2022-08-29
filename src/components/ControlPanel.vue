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
      <router-link v-if="$store.getters.auth" :to="'edit/new'">
        <md-button class="md-dense md-raised new_user">New user</md-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearHandler() {
      this.$store.commit('setSearchString', '');
    }
  },
  computed: {
    searchString: {
      get() {
        return this.$store.getters.searchString;
      },
      set(value) {
        this.$store.commit('setSearchString', value);
      }
    },
    gender: {
      get() {
        return this.$store.getters.gender;
      },
      set(value) {
        this.$store.commit('setGenderFilter', value);
      }
    },
    sorting: {
      get() {
        return this.$store.getters.sorting;
      },
      set(value) {
        this.$store.commit('setNameSorting', value);
      }
    }
  }
};
</script>

<style scoped>
.input {
  margin: 8px;
  width: 256px;
}

.filter {
  margin: 8px;
  width: 96px;
}

.md-menu-content.md-select-menu {
  width: 96px !important;
}

.new_user {
  background-color: green !important;
  color: white !important;
  margin-bottom: 12px !important;
}
</style>
