import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://urbansync-production-59e1.up.railway.app',
  withCredentials: true
});

// Create a persistent log array
window.requestLogs = [];

window.addLog = (message, data) => {
  const log = { timestamp: new Date().toISOString(), message, data };
  window.requestLogs.push(log);
  // Keep only last 20 logs to reduce client memory usage
  if (window.requestLogs.length > 20) window.requestLogs.shift();
  // Only output to console in development to avoid noisy production logs
  if (import.meta.env.DEV) {
    console.log(`${log.timestamp}: ${message}`, data);
  }
};

// Expose logs globally for debugging
window.viewAuthLogs = () => {
    console.table(window.requestLogs);
};

// Add a request interceptor to add the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
  // Minimal request logging; in production this won't echo to console
  window.addLog('Request', {
    url: config.url,
    method: config.method
  });

    if (token) {
      config.headers.Authorization = token; 
    }
    return config;
  },
  (error) => {
    window.addLog('Request Error', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
  window.addLog('Response Success', {
    url: response.config.url,
    status: response.status
  });
    return response;
  },
  (error) => {
  window.addLog('Response Error', {
    url: error.config?.url,
    status: error.response?.status,
    message: error.message
  });

    if (error.response?.status === 401 || error.response?.status === 403) {
      window.addLog('Auth Error - Clearing credentials', {
        status: error.response.status,
        url: error.config.url
      });
      // Clear local storage only, AuthContext will handle the redirect
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;