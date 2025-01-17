import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

let isRefreshing = false;
let failedQueue = [];

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post("/users/refreshToken/");
        const newToken = res.data.access_token;

        localStorage.setItem("CC_Token", newToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;

        failedQueue.forEach(prom => prom.resolve(newToken));
        failedQueue = [];
        isRefreshing = false;

        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return axios(originalRequest);
      } catch (err) {
        failedQueue.forEach(prom => prom.reject(err));
        failedQueue = [];
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
