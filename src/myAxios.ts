import axios from 'axios';

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

myAxios.interceptors.request.use(async (config) => {
  const store = (await import('@/store')).default;

  const delay = store.getState().settings.delay;
  if (delay !== 0) {
    await sleep(delay);
  }

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default myAxios;
