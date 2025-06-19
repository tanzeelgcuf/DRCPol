// src/config/api.js
// Updated configuration to work with your existing setup

export const API_ENDPOINTS = {
  // Base URL from environment variables
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://34.30.198.6:8081',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register', 
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VALIDATE_TOKEN: '/auth/validate-token',
    PROFILE: '/auth/profile'
  },
  
  // Hotel Management endpoints (for DRCHotel)
  HOTELS: {
    LIST: '/api/establishments',
    CREATE: '/api/establishments',
    GET_BY_ID: '/api/establishments',
    UPDATE: '/api/establishments',
    DELETE: '/api/establishments',
    REGISTER_DRC: '/api/establishments/register-drc-hotel',
    VERIFY: '/api/establishments/{id}/verify',
    STATS: '/api/establishments/{id}/stats'
  },
  
  // Client Management
  CLIENTS: {
    LIST: '/api/clients',
    CREATE: '/api/clients',
    GET_BY_ID: '/api/clients',
    UPDATE: '/api/clients',
    DELETE: '/api/clients',
    REGISTER_GUEST: '/api/clients/register-hotel-guest',
    VERIFY: '/api/clients/{id}/verify',
    BLOCK: '/api/clients/{id}/block',
    UNBLOCK: '/api/clients/{id}/unblock',
    STAYS: '/api/clients/{id}/stays',
    PENDING: '/api/clients/pending',
    VERIFIED: '/api/clients/verified'
  },
  
  // Stays Management
  STAYS: {
    LIST: '/api/stays',
    CREATE: '/api/stays',
    GET_BY_ID: '/api/stays',
    UPDATE: '/api/stays',
    DELETE: '/api/stays',
    CLOSE: '/api/stays/{id}/close',
    CANCEL: '/api/stays/{id}/cancel',
    EXTEND: '/api/stays/{id}/extend',
    TO_CLOSE: '/api/stays/to-close',
    BULK_CLOSE: '/api/stays/bulk-close',
    REPORT: '/api/stays/{id}/report'
  },
  
  // Police Intelligence endpoints (for DRCPol)
  INTELLIGENCE: {
    WATCHLIST: '/intelligence/watchlist',
    WATCHLIST_MATCHES: '/intelligence/watchlist/matches',
    ALERTS: '/intelligence/alerts',
    CASES: '/intelligence/cases',
    DASHBOARD: '/intelligence/dashboard',
    SEARCH_BY_FACE: '/intelligence/watchlist/search-by-face'
  },
  
  // Facial Recognition
  FACIAL_RECOGNITION: {
    SCAN: '/facial-recognition/scan',
    UPLOAD: '/facial-recognition/clients/{clientId}/upload',
    SEARCH: '/facial-recognition/search',
    CAMERA_FEED: '/facial-recognition/camera-feed',
    BIOMETRICS: '/facial-recognition/biometrics'
  },
  
  // Health check
  HEALTH: '/health'
};

// Request timeouts (matching your existing setup)
export const REQUEST_TIMEOUTS = {
  DEFAULT: 30000,      // 30 seconds
  UPLOAD: 120000,      // 2 minutes for file uploads
  DOWNLOAD: 60000      // 1 minute for downloads
};

// API Configuration (matching your apiConfig pattern)
export const apiConfig = {
  BASE_URL: API_ENDPOINTS.BASE_URL,
  TIMEOUT: REQUEST_TIMEOUTS.DEFAULT,
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  ENV: import.meta.env.VITE_ENV || 'production',
  ENDPOINTS: API_ENDPOINTS,
  
  // Helper function to build full URL
  buildUrl: (endpoint) => {
    return `${API_ENDPOINTS.BASE_URL}${endpoint}`;
  },
  
  // Helper function to replace URL parameters
  buildUrlWithParams: (endpoint, params = {}) => {
    let url = endpoint;
    Object.keys(params).forEach(key => {
      url = url.replace(`{${key}}`, params[key]);
    });
    return `${API_ENDPOINTS.BASE_URL}${url}`;
  }
};

export default apiConfig;