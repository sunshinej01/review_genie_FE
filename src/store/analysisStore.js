import { create } from 'zustand';

export const useAnalysisStore = create((set, get) => ({
  // 상태
  analysisData: null,
  competitorData: null,
  loading: false,
  error: null,
  filters: {
    dateRange: '30d',
    category: 'all',
    sentiment: 'all',
  },

  // 액션
  setAnalysisData: data => set({ analysisData: data }),

  setCompetitorData: data => set({ competitorData: data }),

  setLoading: loading => set({ loading }),

  setError: error => set({ error }),

  setFilters: filters =>
    set(state => ({
      filters: { ...state.filters, ...filters },
    })),

  // 분석 데이터 업데이트
  updateAnalysisData: updates =>
    set(state => ({
      analysisData: state.analysisData
        ? { ...state.analysisData, ...updates }
        : updates,
    })),

  // 필터 적용
  applyFilters: newFilters => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    }));
    // 여기서 API 호출을 트리거할 수 있습니다
  },

  // 데이터 초기화
  resetData: () =>
    set({
      analysisData: null,
      competitorData: null,
      loading: false,
      error: null,
      filters: {
        dateRange: '30d',
        category: 'all',
        sentiment: 'all',
      },
    }),

  // 계산된 값들
  getPositiveReviewCount: () => {
    const { analysisData } = get();
    return analysisData?.positiveReviews || 0;
  },

  getNegativeReviewCount: () => {
    const { analysisData } = get();
    return analysisData?.negativeReviews || 0;
  },

  getTotalReviewCount: () => {
    const { analysisData } = get();
    return analysisData?.totalReviews || 0;
  },

  getSatisfactionRate: () => {
    const { analysisData } = get();
    if (!analysisData?.totalReviews) return 0;
    return Math.round(
      (analysisData.positiveReviews / analysisData.totalReviews) * 100
    );
  },

  // 경쟁사 데이터 관련
  getCompetitorNames: () => {
    const { competitorData } = get();
    return competitorData?.competitors?.map(c => c.name) || [];
  },

  getMarketShareComparison: () => {
    const { competitorData } = get();
    if (!competitorData?.marketShare) return [];

    return [
      {
        name: '우리 회사',
        value: competitorData.marketShare.ourCompany,
        color: '#3B82F6',
      },
      {
        name: '경쟁사 A',
        value: competitorData.marketShare.competitorA,
        color: '#EF4444',
      },
      {
        name: '경쟁사 B',
        value: competitorData.marketShare.competitorB,
        color: '#10B981',
      },
    ];
  },
}));
