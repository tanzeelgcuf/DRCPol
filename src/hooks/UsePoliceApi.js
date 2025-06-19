// src/hooks/usePoliceApi.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { policeService } from '../services/policeService';

// Query keys for cache management
export const policeQueryKeys = {
  all: ['police'],
  watchlist: (params) => ['police', 'watchlist', params],
  watchlistEntry: (id) => ['police', 'watchlist', id],
  watchlistMatches: (params) => ['police', 'watchlist', 'matches', params],
  alerts: (params) => ['police', 'alerts', params],
  alert: (id) => ['police', 'alert', id],
  cases: (params) => ['police', 'cases', params],
  case: (id) => ['police', 'case', id],
  dashboard: (params) => ['police', 'dashboard', params],
  facialRecognition: (type, params) => ['police', 'facial', type, params],
  statistics: (type, params) => ['police', 'stats', type, params]
};

// ============= WATCHLIST HOOKS =============

// Get all watchlist entries
export function useWatchlistEntries(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.watchlist(params),
    queryFn: () => policeService.getWatchlistEntries(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false
  });
}

// Get watchlist entry by ID
export function useWatchlistEntry(id) {
  return useQuery({
    queryKey: policeQueryKeys.watchlistEntry(id),
    queryFn: () => policeService.getWatchlistEntryById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
}

// Create watchlist entry mutation
export function useCreateWatchlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: policeService.createWatchlistEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.watchlist() });
      toast.success('Watchlist entry created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create watchlist entry: ${error.message}`);
    }
  });
}

// Update watchlist entry mutation
export function useUpdateWatchlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.updateWatchlistEntry(id, data),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(policeQueryKeys.watchlistEntry(id), data);
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.watchlist() });
      toast.success('Watchlist entry updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update watchlist entry: ${error.message}`);
    }
  });
}

// Delete watchlist entry mutation
export function useDeleteWatchlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: policeService.deleteWatchlistEntry,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: policeQueryKeys.watchlistEntry(id) });
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.watchlist() });
      toast.success('Watchlist entry deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete watchlist entry: ${error.message}`);
    }
  });
}

// Get watchlist matches
export function useWatchlistMatches(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.watchlistMatches(params),
    queryFn: () => policeService.getWatchlistMatches(params),
    staleTime: 30 * 1000, // 30 seconds for matches (more frequent updates)
    refetchInterval: 60 * 1000, // Auto-refresh every minute
    refetchOnWindowFocus: true
  });
}

// Update match status mutation
export function useUpdateMatchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.updateMatchStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.watchlistMatches() });
      toast.success('Match status updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update match status: ${error.message}`);
    }
  });
}

// Send match alert mutation
export function useSendMatchAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.sendMatchAlert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.watchlistMatches() });
      toast.success('Alert sent successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to send alert: ${error.message}`);
    }
  });
}

// Search watchlist by face mutation
export function useSearchWatchlistByFace() {
  return useMutation({
    mutationFn: policeService.searchWatchlistByFace,
    onSuccess: (data) => {
      if (data.matches && data.matches.length > 0) {
        toast.success(`Found ${data.matches.length} potential matches!`);
      } else {
        toast.info('No matches found in watchlist.');
      }
    },
    onError: (error) => {
      toast.error(`Face search failed: ${error.message}`);
    }
  });
}

// ============= ALERTS HOOKS =============

// Get all alerts
export function useAlerts(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.alerts(params),
    queryFn: () => policeService.getAlerts(params),
    staleTime: 2 * 60 * 1000
  });
}

// Get alert by ID
export function useAlert(id) {
  return useQuery({
    queryKey: policeQueryKeys.alert(id),
    queryFn: () => policeService.getAlertById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
}

// Create alert mutation
export function useCreateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: policeService.createAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.alerts() });
      toast.success('Alert created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create alert: ${error.message}`);
    }
  });
}

// Update alert mutation
export function useUpdateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.updateAlert(id, data),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(policeQueryKeys.alert(id), data);
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.alerts() });
      toast.success('Alert updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update alert: ${error.message}`);
    }
  });
}

// Publish alert mutation
export function usePublishAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.publishAlert(id, data),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(policeQueryKeys.alert(id), data);
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.alerts() });
      toast.success('Alert published successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to publish alert: ${error.message}`);
    }
  });
}

// Search alerts mutation
export function useSearchAlerts() {
  return useMutation({
    mutationFn: policeService.searchAlerts,
    onError: (error) => {
      toast.error(`Search failed: ${error.message}`);
    }
  });
}

// ============= CASES HOOKS =============

// Get all cases
export function useCases(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.cases(params),
    queryFn: () => policeService.getCases(params),
    staleTime: 2 * 60 * 1000
  });
}

// Get case by ID
export function useCase(id) {
  return useQuery({
    queryKey: policeQueryKeys.case(id),
    queryFn: () => policeService.getCaseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
}

// Create case mutation
export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: policeService.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.cases() });
      toast.success('Case created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create case: ${error.message}`);
    }
  });
}

// Update case mutation
export function useUpdateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => policeService.updateCase(id, data),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(policeQueryKeys.case(id), data);
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.cases() });
      toast.success('Case updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update case: ${error.message}`);
    }
  });
}

// Add alert to case mutation
export function useAddAlertToCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ caseId, alertData }) => policeService.addAlertToCase(caseId, alertData),
    onSuccess: (data, { caseId }) => {
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.case(caseId) });
      queryClient.invalidateQueries({ queryKey: policeQueryKeys.cases() });
      toast.success('Alert added to case successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to add alert to case: ${error.message}`);
    }
  });
}

// ============= FACIAL RECOGNITION HOOKS =============

// Process camera feed mutation
export function useProcessCameraFeed() {
  return useMutation({
    mutationFn: policeService.processCameraFeed,
    onSuccess: (data) => {
      if (data.matchCount > 0) {
        toast.warning(`🚨 ${data.matchCount} potential matches detected in camera feed!`, {
          autoClose: false
        });
      }
    },
    onError: (error) => {
      toast.error(`Camera feed processing failed: ${error.message}`);
    }
  });
}

// Search faces mutation
export function useSearchFaces() {
  return useMutation({
    mutationFn: policeService.searchFaces,
    onSuccess: () => {
      toast.info('Face search submitted. Results will be available shortly.');
    },
    onError: (error) => {
      toast.error(`Face search failed: ${error.message}`);
    }
  });
}

// Get search results
export function useSearchResults(requestId) {
  return useQuery({
    queryKey: policeQueryKeys.facialRecognition('search-results', requestId),
    queryFn: () => policeService.getSearchResults(requestId),
    enabled: !!requestId,
    refetchInterval: (data) => {
      // Stop polling when search is completed
      return data?.status === 'completed' ? false : 2000;
    },
    staleTime: 0 // Always fetch fresh data for active searches
  });
}

// Upload facial image mutation
export function useUploadFacialImage() {
  return useMutation({
    mutationFn: ({ clientId, imageFile, onUploadProgress }) => 
      policeService.uploadFacialImage(clientId, imageFile, onUploadProgress),
    onSuccess: () => {
      toast.success('Facial image uploaded successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to upload facial image: ${error.message}`);
    }
  });
}

// Get facial biometric
export function useFacialBiometric(biometricId) {
  return useQuery({
    queryKey: policeQueryKeys.facialRecognition('biometric', biometricId),
    queryFn: () => policeService.getFacialBiometric(biometricId),
    enabled: !!biometricId,
    staleTime: 10 * 60 * 1000 // 10 minutes for biometric data
  });
}

// ============= DASHBOARD HOOKS =============

// Get dashboard data
export function usePoliceDashboard(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.dashboard(params),
    queryFn: () => policeService.getDashboardData(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
    refetchOnWindowFocus: true
  });
}

// Get police-specific dashboard
export function usePoliceSpecificDashboard() {
  return useQuery({
    queryKey: ['police', 'dashboard', 'specific'],
    queryFn: () => policeService.getPoliceDashboard(),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000
  });
}

// Create police report mutation
export function useCreatePoliceReport() {
  return useMutation({
    mutationFn: policeService.createPoliceReport,
    onSuccess: () => {
      toast.success('Police report created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create police report: ${error.message}`);
    }
  });
}

// ============= BORDER CONTROL HOOKS =============

// Get border crossing alerts
export function useBorderCrossingAlerts() {
  return useQuery({
    queryKey: ['police', 'border', 'alerts'],
    queryFn: () => policeService.getBorderCrossingAlerts(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Auto-refresh every minute
    refetchOnWindowFocus: true
  });
}

// Check border crossing mutation
export function useCheckBorderCrossing() {
  return useMutation({
    mutationFn: policeService.checkBorderCrossing,
    onSuccess: (data) => {
      if (data.matchResults?.isMatch) {
        toast.error(`🚨 WATCHLIST MATCH DETECTED! Confidence: ${(data.matchResults.confidence * 100).toFixed(1)}%`, {
          autoClose: false
        });
      } else {
        toast.success('✅ No watchlist matches found. Crossing approved.');
      }
    },
    onError: (error) => {
      toast.error(`Border crossing check failed: ${error.message}`);
    }
  });
}

// ============= STATISTICS HOOKS =============

// Get watchlist statistics
export function useWatchlistStatistics() {
  return useQuery({
    queryKey: policeQueryKeys.statistics('watchlist', {}),
    queryFn: () => policeService.getWatchlistStatistics(),
    staleTime: 5 * 60 * 1000 // 5 minutes for statistics
  });
}

// Get case statistics
export function useCaseStatistics(params = {}) {
  return useQuery({
    queryKey: policeQueryKeys.statistics('cases', params),
    queryFn: () => policeService.getCaseStatistics(params),
    staleTime: 5 * 60 * 1000
  });
}

// ============= REAL-TIME HOOKS =============

// Real-time police data (high-priority updates)
export function useRealTimePoliceData() {
  const { data: matches } = useWatchlistMatches({}, {
    refetchInterval: 30 * 1000, // Every 30 seconds
    refetchIntervalInBackground: true
  });

  const { data: alerts } = useAlerts({ status: 'published' }, {
    refetchInterval: 60 * 1000, // Every minute
    refetchIntervalInBackground: false
  });

  const { data: borderAlerts } = useBorderCrossingAlerts();

  return {
    newMatches: matches?.data?.filter(match => match.status === 'new') || [],
    activeAlerts: alerts?.data || [],
    borderAlerts: borderAlerts?.alerts || [],
    criticalCount: (matches?.data?.filter(match => match.status === 'new') || []).length,
    lastUpdate: new Date().toISOString()
  };
}

// Prefetch police data
export function usePrefetchPoliceData() {
  const queryClient = useQueryClient();

  const prefetchWatchlist = () => {
    queryClient.prefetchQuery({
      queryKey: policeQueryKeys.watchlist({}),
      queryFn: () => policeService.getWatchlistEntries(),
      staleTime: 2 * 60 * 1000
    });
  };

  const prefetchAlerts = () => {
    queryClient.prefetchQuery({
      queryKey: policeQueryKeys.alerts({}),
      queryFn: () => policeService.getAlerts(),
      staleTime: 2 * 60 * 1000
    });
  };

  const prefetchDashboard = () => {
    queryClient.prefetchQuery({
      queryKey: policeQueryKeys.dashboard({}),
      queryFn: () => policeService.getDashboardData(),
      staleTime: 1 * 60 * 1000
    });
  };

  return {
    prefetchWatchlist,
    prefetchAlerts,
    prefetchDashboard
  };
}