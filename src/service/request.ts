import axios from 'axios';

const instance = axios.create({
  baseURL: `${origin}/api/v1/`,
  timeout: 300000,
});

instance.interceptors.request.use((config: any) => {
  const token = sessionStorage.getItem('token');
  config.headers['Authorization'] = token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    if (error?.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error.response);
  }
);

export default instance;
