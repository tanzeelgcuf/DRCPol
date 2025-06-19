// services/policeService.js
import { httpService } from './httpClient';
import { apiConfig } from '../config/api';

class PoliceService {
  // Watchlist Management
  
  // Get all watchlist entries
  async getWatchlistEntries(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST}${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch watchlist entries:', error);
      throw error;
    }
  }

  // Get watchlist entry by ID
  async getWatchlistEntryById(id) {
    try {
      return await httpService.get(`${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch watchlist entry ${id}:`, error);
      throw error;
    }
  }

  // Create new watchlist entry
  async createWatchlistEntry(entryData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST, entryData);
    } catch (error) {
      console.error('Failed to create watchlist entry:', error);
      throw error;
    }
  }

  // Update watchlist entry
  async updateWatchlistEntry(id, entryData) {
    try {
      return await httpService.put(`${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST}/${id}`, entryData);
    } catch (error) {
      console.error(`Failed to update watchlist entry ${id}:`, error);
      throw error;
    }
  }

  // Delete watchlist entry
  async deleteWatchlistEntry(id) {
    try {
      return await httpService.delete(`${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST}/${id}`);
    } catch (error) {
      console.error(`Failed to delete watchlist entry ${id}:`, error);
      throw error;
    }
  }

  // Get watchlist matches
  async getWatchlistMatches(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST_MATCHES}${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch watchlist matches:', error);
      throw error;
    }
  }

  // Update match status
  async updateMatchStatus(matchId, statusData) {
    try {
      return await httpService.put(`${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST_MATCHES}/${matchId}`, statusData);
    } catch (error) {
      console.error(`Failed to update match ${matchId}:`, error);
      throw error;
    }
  }

  // Send alert for match
  async sendMatchAlert(matchId, alertData) {
    try {
      return await httpService.post(`${apiConfig.ENDPOINTS.INTELLIGENCE.WATCHLIST_MATCHES}/${matchId}/alert`, alertData);
    } catch (error) {
      console.error(`Failed to send alert for match ${matchId}:`, error);
      throw error;
    }
  }

  // Search watchlist by face
  async searchWatchlistByFace(imageData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.INTELLIGENCE.SEARCH_BY_FACE, imageData);
    } catch (error) {
      console.error('Failed to search watchlist by face:', error);
      throw error;
    }
  }

  // Alert Management
  
  // Get all alerts
  async getAlerts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS}${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      throw error;
    }
  }

  // Get alert by ID
  async getAlertById(id) {
    try {
      return await httpService.get(`${apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch alert ${id}:`, error);
      throw error;
    }
  }

  // Create new alert
  async createAlert(alertData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS, alertData);
    } catch (error) {
      console.error('Failed to create alert:', error);
      throw error;
    }
  }

  // Update alert
  async updateAlert(id, alertData) {
    try {
      return await httpService.put(`${apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS}/${id}`, alertData);
    } catch (error) {
      console.error(`Failed to update alert ${id}:`, error);
      throw error;
    }
  }

  // Publish alert
  async publishAlert(id, publishData) {
    try {
      return await httpService.post(`${apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS}/${id}/publish`, publishData);
    } catch (error) {
      console.error(`Failed to publish alert ${id}:`, error);
      throw error;
    }
  }

  // Search alerts
  async searchAlerts(searchData) {
    try {
      return await httpService.post(`${apiConfig.ENDPOINTS.INTELLIGENCE.ALERTS}/search`, searchData);
    } catch (error) {
      console.error('Failed to search alerts:', error);
      throw error;
    }
  }

  // Case Management
  
  // Get all cases
  async getCases(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${apiConfig.ENDPOINTS.INTELLIGENCE.CASES}${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch cases:', error);
      throw error;
    }
  }

  // Get case by ID
  async getCaseById(id) {
    try {
      return await httpService.get(`${apiConfig.ENDPOINTS.INTELLIGENCE.CASES}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch case ${id}:`, error);
      throw error;
    }
  }

  // Create new case
  async createCase(caseData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.INTELLIGENCE.CASES, caseData);
    } catch (error) {
      console.error('Failed to create case:', error);
      throw error;
    }
  }

  // Update case
  async updateCase(id, caseData) {
    try {
      return await httpService.put(`${apiConfig.ENDPOINTS.INTELLIGENCE.CASES}/${id}`, caseData);
    } catch (error) {
      console.error(`Failed to update case ${id}:`, error);
      throw error;
    }
  }

  // Add alert to case
  async addAlertToCase(caseId, alertData) {
    try {
      return await httpService.post(`${apiConfig.ENDPOINTS.INTELLIGENCE.CASES}/${caseId}/alerts`, alertData);
    } catch (error) {
      console.error(`Failed to add alert to case ${caseId}:`, error);
      throw error;
    }
  }

  // Intelligence Dashboard
  
  // Get dashboard data
  async getDashboardData(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${apiConfig.ENDPOINTS.INTELLIGENCE.DASHBOARD}${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      throw error;
    }
  }

  // Facial Recognition Services
  
  // Process camera feed
  async processCameraFeed(feedData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.FACIAL_RECOGNITION.CAMERA_FEED, feedData);
    } catch (error) {
      console.error('Failed to process camera feed:', error);
      throw error;
    }
  }

  // Search faces
  async searchFaces(searchData) {
    try {
      return await httpService.post(apiConfig.ENDPOINTS.FACIAL_RECOGNITION.SEARCH, searchData);
    } catch (error) {
      console.error('Failed to search faces:', error);
      throw error;
    }
  }

  // Get search results
  async getSearchResults(requestId) {
    try {
      return await httpService.get(`${apiConfig.ENDPOINTS.FACIAL_RECOGNITION.SEARCH}/${requestId}`);
    } catch (error) {
      console.error(`Failed to get search results ${requestId}:`, error);
      throw error;
    }
  }

  // Upload facial image
  async uploadFacialImage(clientId, imageFile, onUploadProgress = null) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const url = apiConfig.ENDPOINTS.FACIAL_RECOGNITION.UPLOAD.replace('{clientId}', clientId);
      return await httpService.uploadFile(url, formData, onUploadProgress);
    } catch (error) {
      console.error('Failed to upload facial image:', error);
      throw error;
    }
  }

  // Get facial biometric
  async getFacialBiometric(biometricId) {
    try {
      return await httpService.get(`${apiConfig.ENDPOINTS.FACIAL_RECOGNITION.BIOMETRICS}/${biometricId}`);
    } catch (error) {
      console.error(`Failed to get facial biometric ${biometricId}:`, error);
      throw error;
    }
  }

  // Border Control Services
  
  // Get border crossing alerts
  async getBorderCrossingAlerts() {
    try {
      return await httpService.get('/intelligence/watchlist/border/crossing-alerts');
    } catch (error) {
      console.error('Failed to fetch border crossing alerts:', error);
      throw error;
    }
  }

  // Check border crossing
  async checkBorderCrossing(crossingData) {
    try {
      return await httpService.post('/intelligence/watchlist/border/crossing-check', crossingData);
    } catch (error) {
      console.error('Failed to check border crossing:', error);
      throw error;
    }
  }

  // Statistics and Analytics
  
  // Get watchlist statistics
  async getWatchlistStatistics() {
    try {
      return await httpService.get('/intelligence/watchlist/statistics');
    } catch (error) {
      console.error('Failed to fetch watchlist statistics:', error);
      throw error;
    }
  }

  // Get case statistics
  async getCaseStatistics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `/intelligence/cases/statistics${queryString ? `?${queryString}` : ''}`;
      return await httpService.get(url);
    } catch (error) {
      console.error('Failed to fetch case statistics:', error);
      throw error;
    }
  }

  // Get police dashboard
  async getPoliceDashboard() {
    try {
      return await httpService.get('/intelligence/watchlist/police/dashboard');
    } catch (error) {
      console.error('Failed to fetch police dashboard:', error);
      throw error;
    }
  }

  // Create police report
  async createPoliceReport(reportData) {
    try {
      return await httpService.post('/intelligence/watchlist/police/report', reportData);
    } catch (error) {
      console.error('Failed to create police report:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const policeService = new PoliceService();
export default policeService;