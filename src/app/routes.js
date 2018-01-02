/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */

import Home from './pages/home/index/index.vue';
import Login from './pages/auth/login/login.vue';
import Register from './pages/register/accountSetup/accountSetup.vue';

const Users = (resolve) => {
  require.ensure(['./pages/withNavigation/users/index/index.vue'], () => {
  // eslint-disable-next-line
  resolve(require('./pages/withNavigation/users/index/index.vue'));
  }, 'users');
};

const UserLayout = (resolve) => {
  require.ensure(['./pages/withNavigation/navigation.vue'], () => {
  // eslint-disable-next-line
  resolve(require('./pages/withNavigation/navigation.vue'));
  }, 'users');
};

// eslint-disable-next-line
export default [

    // Home
  {
    path: '/home',
    name: 'home',
    components: {
      default: Home,
    },
  },
  // Login
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login,
    },
  },
  // Register
  {
    path: '/register',
    name: 'register',
    components: {
      default: Register,
    },
  },
  // Components with the navigation wrapper.
  {
    path: '',
    component: UserLayout,
    children: [
      {
        path: '/users',
        name: 'users',
        components: {
          default: Users,
        },
        // If the user needs to be authenticated to view this page
        meta: {
          auth: true,
        },
        children: [
        ],
      },
      {
        path: '/*',
        redirect: '/home',
      },
    ],
  },
];
