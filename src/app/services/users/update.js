import Vue from 'vue';
import userTransformer from './../../transformers/account';

const success = (client, resolve) => {
  resolve(userTransformer.fetch(client));
};

const failed = (errors, reject) => {
  reject(userTransformer.fetch(errors));
};

export default (id, client) => {
  const data = new FormData();
  Object.keys(client).map((k) => {
    data.append(k, client[k]);
    return null;
  });
  return new Promise((resolve, reject) => {
    Vue.$http
      .request({
        url: `/users/${id}`,
        data,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        failed(error.response.data, reject);
      });
  });
};
