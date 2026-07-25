import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { path, STORAGE_TOKEN_KEY, STORAGE_ROLE_KEY } from './consts';
import { getCookie, deleteCookie, setCookie } from './helpers/cookie';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // IMPORTANT: to send HttpOnly cookies for refresh token
});

// Helper for Silent Refresh to avoid infinite loops when multiple requests fail at once
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = getCookie(STORAGE_TOKEN_KEY);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorResponseHandler = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    // 1. Backend error message check: 'Access token sudah expired, silakan refresh token'
    const errorMessage = (error.response.data as any)?.message;
    
    if (errorMessage === 'Access token sudah expired, silakan refresh token') {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return authAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const role = getCookie(STORAGE_ROLE_KEY) || 'calas';
      const refreshUrl = role === 'asisten' ? '/api/auth/asisten/refresh' : '/api/auth/calas/refresh';

      try {
        const res = await axios.post(
          `${BASE_URL}${refreshUrl}`,
          {},
          { withCredentials: true } // Must send HTTP-Only cookie 'lepkom_asisten_refresh' or 'calas_refresh'
        );
        
        const newAccessToken = res.data?.data?.accessToken;
        
        // Save new token
        setCookie(STORAGE_TOKEN_KEY, newAccessToken);
        
        // Update header and retry original request
        authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        processQueue(null, newAccessToken);
        return authAxios(originalRequest);
      } catch (refreshError) {
        // Refresh token is also expired or invalid
        processQueue(refreshError, null);
        deleteCookie(STORAGE_TOKEN_KEY);
        deleteCookie(STORAGE_ROLE_KEY);
        window.location.href = path.login;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else {
      // 401 but not because of expired token (e.g. invalid token, wrong password, banned user)
      deleteCookie(STORAGE_TOKEN_KEY);
      deleteCookie(STORAGE_ROLE_KEY);
      window.location.href = path.login;
    }
  }

  return Promise.reject(error);
};

authAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorResponseHandler(error)
);

export default authAxios;
