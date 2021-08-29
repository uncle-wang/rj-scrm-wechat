import axios from 'axios';

axios.interceptors.response.use(function(response) {
  return response.data;
}, function(error) {
  return Promise.reject(error);
});

export default (config) => {
  return axios(config);
};
