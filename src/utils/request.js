import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.response.use(function(response) {
	if (response.request.responseURL.indexOf('/api/') > -1) {
		if (response.data.status === 1) {
			return response.data.data;
		}
		return Promise.reject(response.data);
	}
  return response.data;
}, function(error) {
  return Promise.reject(error);
});

export default (config) => {
  return axios(config);
};
