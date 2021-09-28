import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(function(config) {
  if (store.state.token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: store.state.token,
      },
    };
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  if (response.data.status === 1) {
    return response.data.data;
  }
  console.error(response);
  Message.error(response.data.msg);
  return Promise.reject(response.data);
}, function(error) {
  console.error(error);
  Message.error(error.message);
  return Promise.reject(error);
});

export default (config) => {
  return axios(config);
};
