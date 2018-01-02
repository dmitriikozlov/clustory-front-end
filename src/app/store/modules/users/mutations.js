  import {
    FETCH_USERS,
    RESET_USERS,
    FETCH_ALL_USERS,
  } from './../../mutation-types';

  export default {
    [FETCH_USERS](state, { users, pagination }) {
      // eslint-disable-next-line
      state.items = users;
      // eslint-disable-next-line
      state.pagination = pagination;
    },

    [RESET_USERS](state) {
      // eslint-disable-next-line
      state.all = [];
      // eslint-disable-next-line
      state.items = [];
      // eslint-disable-next-line
      state.pagination = {};
    },

    [FETCH_ALL_USERS](state, users) {
      // eslint-disable-next-line
      state.all = users;
    },
  };
