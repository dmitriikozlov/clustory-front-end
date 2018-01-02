import Vue from 'vue';
import store from './../../store';
import userTransformer from './../../transformers/account';
import paginationTransformer from '../../transformers/pagination';

/* eslint no-console: ["error", { allow: ["log", "error"] }] */
const success = ({ data }, resolve) => {
  const users = userTransformer.fetchCollection(data.data);
  const pagination = paginationTransformer.fetch(data.pagination);
  store.dispatch('fetchUsers', { users, pagination });
  resolve({ users, pagination });
};

const failed = (error, reject) => reject(error);


export default (page = 1, limit = 5) => {
  const url = `/users?page=${page}&limit=${limit}`;

  return new Promise((resolve, reject) => {
    Vue.$http.get(url)
      .then((response) => {
        success(response, resolve);
      })
      .catch((error) => {
        failed(error, reject);
      });
  });
};
