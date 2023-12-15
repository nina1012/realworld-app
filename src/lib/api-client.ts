import { BASE_URL_API } from '@/config/constants';
import Axios from 'axios';

export const apiClient = Axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
