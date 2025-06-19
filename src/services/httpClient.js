// services/httpClient.js
import axios from 'axios';
import { apiConfig } from '../config/api';

// Create axios instance with default configuration
const httpClient = axios.create({
  baseURL: apiConfig.BASE_URL,
  timeout: apiConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - Add auth token to requests
httpClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    const apiKey = localStorage.getItem('apiKey');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For API key authentication (if using)
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    if (apiConfig.DEBUG) {
      console.log('🚀 HTTP Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
httpClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;
    
    if (apiConfig.DEBUG) {
      console.log('✅ HTTP Response:', {
        status: response.status,
        url: response.config.url,
        duration: `${duration}ms`,
        data: response.data
      });
    }
    
    return response;
  },
  (error) => {
    const duration = error.config?.metadata ? 
      new Date() - error.config.metadata.startTime : 0;
    
    if (apiConfig.DEBUG) {
      console.error('❌ HTTP Error:', {
        status: error.response?.status,
        url: error.config?.url,
        duration: `${duration}ms`,
        message: error.message,
        data: error.response?.data
      });
    }
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Redirect to login (you can customize this)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      console.warn('⚠️ Access denied - insufficient permissions');
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('🔴 Server error - please try again later');
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
export const httpService = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await httpClient.get(url, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await httpClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await httpClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await httpClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await httpClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // File upload
  uploadFile: async (url, formData, onUploadProgress = null) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress
      };
      
      const response = await httpClient.post(url, formData, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
  
  // Download file
  downloadFile: async (url, filename) => {
    try {
      const response = await httpClient.get(url, {
        responseType: 'blob'
      });
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
};

// Error handling helper
const handleError = (error) => {
  const errorResponse = {
    message: 'An unexpected error occurred',
    status: 500,
    details: null
  };
  
  if (error.response) {
    // Server responded with error status
    errorResponse.message = error.response.data?.error || error.response.data?.message || error.message;
    errorResponse.status = error.response.status;
    errorResponse.details = error.response.data?.details || null;
  } else if (error.request) {
    // Request was made but no response received
    errorResponse.message = 'Network error - please check your connection';
    errorResponse.status = 0;
  } else {
    // Something else happened
    errorResponse.message = error.message;
  }
  
  return errorResponse;
};

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await httpService.get(apiConfig.ENDPOINTS.HEALTH);
    return response;
  } catch (error) {
    throw error;
  }
};

export default httpClient;