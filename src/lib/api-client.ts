import { BASE_URL_API } from '@/config/constants';
import { notificationsStore } from '@/stores/notifications';
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
    const message =
      error.response?.data?.message || error.message;

    notificationsStore.getState().showNotification({
      type: 'error',
      title: 'Error',
      duration: 5000,
      message,
    });

    return Promise.reject(error);
  }
);
