/* ============
 * Vuex Getters
 * ============
 *
 * All the getters that can be used
 * inside the store
 */

// Auth
export const isAuthenticated = state => state.auth.authenticated;

// Profile
export const account = state => state.profile.account;


// Users
export const users = state => ({
  items: state.users.items,
  pagination: state.users.pagination,
});

export const allUsers = state => state.users.all;
