import {
  GET_ACCOUNT,
  RESET_PROFILE,
} from './../../mutation-types';

export default {
  [GET_ACCOUNT](state, account) {
    if (Object.keys(account).length !== 0) {
      localStorage.setItem('account', JSON.stringify(account));
      //eslint-disable-next-line
      state.account = account;
    } else {
      //eslint-disable-next-line
      state.account = JSON.parse(localStorage.getItem('account'));
    }
  },

  [RESET_PROFILE](state) {
    // eslint-disable-next-line
    state.account = {};
    localStorage.removeItem('account');
  },
};
