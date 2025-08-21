import { create } from 'zustand';
import apiService from '../services/api';

const useApiStore = create((set, get) => ({
  // 상태
  dashboardData: null,
  reviews: [],
  keywordAnalysis: null,
  competitorAnalysis: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    size: 20,
    total: 0,
    totalPages: 0
  },

  // 액션
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // 대시보드 데이터 로드
  loadDashboardData: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getDashboardData();
      set({ dashboardData: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 리뷰 데이터 로드
  loadReviews: async (page = 0, size = 20) => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getAllReviews(page, size);
      set({ 
        reviews: data.reviews, 
        pagination: data.pagination,
        loading: false 
      });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 키워드 분석 데이터 로드
  loadKeywordAnalysis: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getKeywordAnalysis();
      set({ keywordAnalysis: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 경쟁사 분석 데이터 로드
  loadCompetitorAnalysis: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getCompetitorAnalysis();
      set({ competitorAnalysis: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 페이지 변경
  setPage: (page) => {
    const { pagination } = get();
    set({ 
      pagination: { ...pagination, page },
      reviews: [] // 페이지 변경 시 리뷰 초기화
    });
  },

  // 페이지 크기 변경
  setPageSize: (size) => {
    const { pagination } = get();
    set({ 
      pagination: { ...pagination, size, page: 0 }, // 페이지 크기 변경 시 첫 페이지로
      reviews: []
    });
  },

  // 모든 데이터 새로고침
  refreshAllData: async () => {
    try {
      set({ loading: true, error: null });
      
      // 병렬로 모든 데이터 로드
      const [dashboardData, reviewsData, keywordData, competitorData] = await Promise.all([
        apiService.getDashboardData(),
        apiService.getAllReviews(0, get().pagination.size),
        apiService.getKeywordAnalysis(),
        apiService.getCompetitorAnalysis()
      ]);

      set({
        dashboardData,
        reviews: reviewsData.reviews,
        pagination: reviewsData.pagination,
        keywordAnalysis: keywordData,
        competitorAnalysis: competitorData,
        loading: false
      });

      return {
        dashboardData,
        reviewsData,
        keywordData,
        competitorData
      };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 백엔드 상태 확인
  checkBackendStatus: async () => {
    try {
      const status = await apiService.checkBackendStatus();
      return status;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));

export default useApiStore;
