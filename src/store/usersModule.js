import { getUsers } from '@/api';

export default {
  state: {
    users: [],
    searchString: '',
    nameSorting: 'asis',
    genderFilter: 'all',
    currentUser: null
  },

  actions: {
    async loadUsers(context) {
      const info = await getUsers();
      context.commit('setUsers', info);
    }
  },

  getters: {
    searchString(state) {
      return state.searchString;
    },
    users(state) {
      return state.users;
    },
    gender(state) {
      return state.genderFilter;
    },
    sorting(state) {
      return state.nameSorting;
    },
    currentUser(state) {
      return {
        title: state.currentUser.name.title,
        firstName: state.currentUser.name.first,
        lastName: state.currentUser.name.last,
        gender: state.currentUser.gender,
        age: state.currentUser.dob.age,
        email: state.currentUser.email,
        picture: state.currentUser.picture.large
      };
    },
    usersToShow(state) {
      return state.users
        .filter((item) => {
          if (state.searchString === '') {
            return true;
          } else {
            return (item.name.first + ' ' + item.name.last)
              .toLowerCase()
              .includes(state.searchString.toLowerCase());
          }
        })
        .filter((item) => {
          if (state.genderFilter === 'all') {
            return true;
          } else {
            return item.gender === state.genderFilter;
          }
        })
        .sort((itemA, itemB) => {
          if (state.nameSorting === 'asis') {
            return 0;
          } else if (state.nameSorting === 'asc') {
            return itemA.name.first > itemB.name.first
              ? 1
              : itemA.name.first < itemB.name.first
              ? -1
              : 0;
          } else if (state.nameSorting === 'desc') {
            return itemA.name.first > itemB.name.first
              ? -1
              : itemA.name.first < itemB.name.first
              ? 1
              : 0;
          }
        });
    }
  },

  mutations: {
    setSearchString(state, payload) {
      state.searchString = payload;
    },
    setGenderFilter(state, payload) {
      state.genderFilter = payload;
    },
    setNameSorting(state, payload) {
      state.nameSorting = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    deleteUser(state, payload) {
      state.users = state.users.filter((item) => item.id.value !== payload);
    },
    setCurrentUser(state, payload) {
      if (payload === 'new') {
        state.currentUser = {
          name: {
            first: '',
            title: '',
            last: ''
          },
          dob: {
            age: null
          },
          gender: null,
          email: '',
          picture: {
            large: ''
          }
        };
      } else {
        state.currentUser = {
          ...state.users.find((item) => item.id.value === payload)
        };
      }
    },
    saveCurrentUser(state, payload) {
      if (payload.id === 'new') {
        const newUser = {};
        newUser.name = {};
        newUser.name.title = payload.title;
        newUser.name.first = payload.firstName;
        newUser.name.last = payload.lastName;
        newUser.gender = payload.gender;
        newUser.dob = {};
        newUser.dob.age = payload.age;
        newUser.email = payload.email;
        newUser.picture = {};
        newUser.picture.large = '';
        newUser.id = {};
        newUser.id.value = new Date().toLocaleString();
        state.users.push(newUser);
      } else {
        const editedUser = state.users.find(
          (item) => item.id.value === payload.id
        );
        editedUser.name.title = payload.title;
        editedUser.name.first = payload.firstName;
        editedUser.name.last = payload.lastName;
        editedUser.gender = payload.gender;
        editedUser.dob.age = payload.age;
        editedUser.email = payload.email;
      }
      state.currentUser = null;
    }
  }
};
