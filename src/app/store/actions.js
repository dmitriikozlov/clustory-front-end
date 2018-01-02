/* ============
 * Vuex Actions
 * ============
 *
 * All the actions that can be used
 * inside the store
 */
import * as types from './mutation-types';

// Profile
export const getAccount = ({ commit }, account) => {
  commit(types.GET_ACCOUNT, account);
};

// Auth
export const login = ({ commit }, token) => {
  commit(types.LOGIN, token);
};

export const logout = ({ commit }) => {
  commit(types.RESET_PROFILE);
  commit(types.LOGOUT);
};

export const checkAuthentication = ({ commit }) => {
  commit(types.CHECK_AUTHENTICATION);
};


// Users
export const fetchUsers = ({ commit }, { users, pagination }) => {
  commit(types.FETCH_USERS, { users, pagination });
};

export const fetchAllUsers = ({ commit }, users) => {
  commit(types.FETCH_ALL_USERS, users);
};

export const resetUsers = ({ commit }) => {
  commit(types.RESET_USERS);
};
